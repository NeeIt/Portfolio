import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MyTranslateService } from "@services/translate.service";
import { SCHEMA_DATA } from "@constants/base/shema-data.const";
import {catchError, filter, forkJoin, map, mergeMap, Observable, of, Subscription, take } from 'rxjs';
import { DOCUMENT} from "@angular/common";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  private renderer: Renderer2;
  private routerSubscription!: Subscription;
  readonly SCHEMA_ID = 'schema-script';
  constructor(
    private rendererFactory: RendererFactory2,
    private translateService: MyTranslateService,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public routeChangeSubscribe(): void {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(data => {
      this.updateSchemaBasedOnRoute(data['schemaKey']);
    });
  }

  public routeChangeUnsubscribe(): void {
    this.routerSubscription?.unsubscribe();
  }

  public updateSchema(schemaDataKey: string) {
    this.getTranslatedSchemaData(schemaDataKey).pipe(take(1)).subscribe(
      (data) => {
        this.renderSchema(data);
      }
    );
  }

  public getTranslatedSchemaData(schemaDataKey: string): Observable<any> {
    return this.translateObject(SCHEMA_DATA[schemaDataKey]);
  }

  public translateObject(obj: any): Observable<any> {
    if (typeof obj === 'string') {
      if (obj.trim() === '') {
        return of(obj);
      }
      return this.translate.get(obj).pipe(
        take(1),
        catchError(error => {
          console.error('Ошибка перевода:', error, 'Ключ:', obj);
          return of(obj);
        })
      );
    } else if (Array.isArray(obj)) {
      return forkJoin(obj.map(item => this.translateObject(item).pipe(take(1))));
    } else if (typeof obj === 'object' && obj !== null) {
      const translations$ = Object.keys(obj).map(key =>
        this.translateObject(obj[key]).pipe(
          take(1),
          map(translated => ({ key, translated }))
        )
      );
      return forkJoin(translations$).pipe(
        map(translations => {
          const translatedObj: {[key: string]: any} = {};
          translations.forEach(({ key, translated }) => {
            translatedObj[key] = translated;
          });
          return translatedObj;
        })
      );
    }
    return of(obj);
  }

  private renderSchema(schemaData: any) {
    let newScript = this.renderer.createElement('script');
    newScript.type = 'application/ld+json';
    newScript.text = JSON.stringify(schemaData);
    newScript.id = this.SCHEMA_ID;

    let existingScript = this.document.getElementById(this.SCHEMA_ID);

    if (existingScript) {
      this.renderer.removeChild(this.document.head, existingScript);
    }
    this.renderer.appendChild(this.document.head, newScript);
  }

  public getSchema(schemaDataKey: string): Observable<any> {
    return this.getTranslatedSchemaData(schemaDataKey).pipe(take(1));
  }

  public updateSchemaBasedOnRoute(key: string) {
    // Определите логику для выбора схемы
    if (key in SCHEMA_DATA) {
      this.updateSchema(key);
    } else if (key === '404') {
      this.removeSchema();
    } else {
      this.updateSchema('DEFAULT');
    }
  }

  public removeSchema() {
    let existingScript = this.document.getElementById(this.SCHEMA_ID);
    if (existingScript) {
      this.renderer.removeChild(this.document.head, existingScript);
    }
  }
}
