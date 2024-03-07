import {fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SchemaService } from './schema.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import {BehaviorSubject, of} from "rxjs";
import { Router, NavigationEnd } from '@angular/router';

describe('SchemaService', () => {
  let service: SchemaService;
  let document: Document;
  let translateService: TranslateService;
  let router: Router;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: DummyComponent, data: { schemaKey: 'SEO.HOME' } }
        ]),
        TranslateModule.forRoot()],
      providers: [
        SchemaService,
        { provide: 'isServer', useValue: false }
      ]
    });
    service = TestBed.inject(SchemaService);
    router = TestBed.inject(Router);
    document = TestBed.inject(DOCUMENT);
    translateService = TestBed.inject(TranslateService);
    service.routeChangeSubscribe();
    await router.initialNavigation(); // Для инициализации роутера
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should call updateSchemaBasedOnRoute with correct key', fakeAsync(() => {
    const spy = spyOn(service, 'updateSchemaBasedOnRoute').and.callThrough();
    router.navigate(['home']); // Используйте реальную навигацию для тестирования
    tick(); // Дождитесь завершения асинхронных операций
    expect(spy).toHaveBeenCalledWith('SEO.HOME');
    flush(); // Убедитесь, что нет оставшихся асинхронных процессов
  }));

  it('should append script when updateSchema is called', () => {
    const testData = { '@context': 'http://schema.org' };
    spyOn(service, 'getTranslatedSchemaData').and.returnValue(of(testData));
    service.updateSchema('testKey');
    const newScript = document.getElementById(service.SCHEMA_ID) as HTMLScriptElement;

    expect(newScript).toBeTruthy();
    expect(newScript.type).toBe('application/ld+json');
    expect(newScript.text).toBe(JSON.stringify(testData));
  });

  it('should remove script when removeSchema is called', () => {
    service.removeSchema();
    const existingScript = document.getElementById(service.SCHEMA_ID);
    expect(existingScript).toBeNull();
  });

  it('should translate object', (done) => {
    const obj = { 'test': 'testKey' };
    spyOn(translateService, 'get').and.returnValue(of('translatedValue'));
    service.translateObject(obj).subscribe(translatedObj => {
      expect(translatedObj['test']).toBe('translatedValue');
      done();
    });
  });
});

class DummyComponent {}
