import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import { ICountryData } from "countries-list";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, filter, Subject, take } from "rxjs";
import { AVAILABLE_LANGUAGES, COUNTRIES_LIST, DEFAULT_LANGUAGE } from "@constants/base/language.const";
import { DOCUMENT, Location} from '@angular/common';
import { NavigationEnd, Router } from "@angular/router";
import { makeStateKey, TransferState } from "@angular/platform-browser";
import { LANG_FONTS } from "@constants/base/lang-fonts.const";
import * as Sentry from "@sentry/angular-ivy";

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  private readonly LANGUAGE_KEY = makeStateKey('selected-language')

  private renderer!: Renderer2;

  private readonly _currentLang = new BehaviorSubject<ICountryData | undefined>(
    COUNTRIES_LIST.find(country => {
      return country.iso2 === this.transferState.get(this.LANGUAGE_KEY, DEFAULT_LANGUAGE as any)
    })
  );
  currentLang$ = this._currentLang.asObservable();
  get currentLang(): ICountryData | undefined {
    return this._currentLang.getValue();
  }

  constructor(
    private readonly transferState: TransferState,
    private readonly translateService: TranslateService,
    private readonly location: Location,
    private readonly router: Router,
    private readonly rendererFactory: RendererFactory2,
    @Inject('isServer') private isServer: boolean,
    @Inject(DOCUMENT) private _document: Document,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    if (this.isServer) {
      this.router.events
        .pipe(
          filter((routerEvent) => routerEvent instanceof NavigationEnd),
          take(1)
        ).subscribe((event: any) => {
          const routeLang = event.url.split('/')[1];
        this.changeLang(MyTranslateService.isAcceptedLanguage(routeLang) ? routeLang.toUpperCase() : DEFAULT_LANGUAGE)
      })
    } else {
        this.translateService.use(this._currentLang.getValue()?.iso2 || DEFAULT_LANGUAGE);
    }
  }

  static getBaseUrl(url: string): string {
    url = url.split('?')[0];
    return MyTranslateService.isSecondaryLanguageUrl(url) ? url.substring(3) || '/' : url;
  }

  static isSecondaryLanguageUrl(url: string): boolean {
    return AVAILABLE_LANGUAGES.filter(lang => lang !== DEFAULT_LANGUAGE).includes(url.split('/')[1].toUpperCase());
  }

  static isAcceptedLanguage(lang: string): boolean {
    return AVAILABLE_LANGUAGES.includes(lang.toUpperCase());
  }

  setLocalStorageLang(): void {
    const lang = localStorage.getItem('me-lang');
    if(lang && lang !== this._currentLang.getValue()?.iso2) {
      this.changeLang(lang);
    }
  }

  // IT'S IS NOT USED. BUT CAN BE USEFUL IN THE FUTURE
  setLanguageFont(lang: string): void {
    const root = this._document.documentElement;
    const font = LANG_FONTS[lang.toUpperCase()] || LANG_FONTS[DEFAULT_LANGUAGE.toUpperCase()];
    if(this.isServer) {
      this.renderer.setStyle(root,'--lang-font', font)
    } else {
      root.style.setProperty('--lang-font', font);
    }
  }

  updateHtmlLangAttribute(lang: string): void {
    const rootHtml = this._document.documentElement;
    this.renderer.setAttribute(rootHtml, 'lang', lang === 'US' ? 'en' : lang.toLowerCase());
  }

  changeLang(lang: string, doSave = false): void {
    this.updateHtmlLangAttribute(lang);
    Sentry.configureScope((scope: any) => {
      scope.setTag('language', lang);
    });
    if(this.isServer) {
      this.translateService.use(lang);
      this.transferState.set(this.LANGUAGE_KEY, lang.toUpperCase() as any)
      this._currentLang.next(COUNTRIES_LIST.find(country => country.iso2.toLowerCase() === lang.toLowerCase()));
      this.setLanguageFont(lang);
    } else {
      const isDefaultNewLang = lang === DEFAULT_LANGUAGE;
      this.router.navigate([(!isDefaultNewLang ? lang.toLowerCase() : '')+ MyTranslateService.getBaseUrl(this.router.url)])
      console.log((!isDefaultNewLang ? lang.toLowerCase() : '')+ MyTranslateService.getBaseUrl(this.router.url), MyTranslateService.getBaseUrl(this.router.url), this.router.url);
      this._currentLang.next(COUNTRIES_LIST.find(country => country.iso2.toLowerCase() === lang.toLowerCase()));
      if(doSave) {
        localStorage.setItem('me-lang', lang);
        setTimeout(() => {
          this.translateService.use(lang);
          this.setLanguageFont(lang);
        }, 300);
      } else {
        this.translateService.use(lang);
        this.setLanguageFont(lang);
      }


    }
  }
}
