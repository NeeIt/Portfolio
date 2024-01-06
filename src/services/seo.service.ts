import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { FACEBOOK_DATA, GOOGLE_DATA, YANDEX_DATA } from "@constants/base/seo.const";
import { environment } from "@environments/environment";
import {AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE} from "@constants/base/language.const";
import {MyTranslateService} from "@services/translate.service";


@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private exceprionUrl: string[] = [];

  constructor(
    private readonly translateService: TranslateService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject('isServer') private readonly isServer: boolean,
    @Inject(DOCUMENT) private readonly doc: Document
  ) {
  }

  initSeoData(): void {
    this.router.events.pipe(filter((routerEvent) => routerEvent instanceof NavigationEnd)).subscribe((routerEvent) => {
      let route = this.activatedRoute;
      if(this.isServer) {
        if(this.exceprionUrl.includes((routerEvent as NavigationEnd).url)) {
          console.log(`SERVER SEO. ${(routerEvent as NavigationEnd).url} was skipped`);
          return
        }
      }
      // Достаем самый крайний route. Нужно для того, чтобы получить язык, который хранится в крайнем коренном route
      while (route.firstChild) {
        route = route.firstChild;
      }
      this.setSeoParams(route);
    });

    this.setCommonMeta();
  }

  setCommonMeta(): void {
    this.meta.updateTag({ name: 'og:image', content: ` https://${environment.hostName}/og.image.png` });
    this.meta.updateTag({ name: 'twitter:image', content: `https://${environment.hostName}/og.image.png` });
    this.meta.updateTag({ name: 'og:site_name', content: environment.hostName });
    this.setFacebookMeta();
    this.setYandexMeta();
    this.setGoogleMeta();
  }

  updateAlternateLinks(link: string): void {
    const alternatesLink = link.split('?')[0];
    const alternates: NodeListOf<HTMLLinkElement> = this.doc.querySelectorAll('link[rel="alternate"]');

    if (!alternates.length) {
      [DEFAULT_LANGUAGE, ...AVAILABLE_LANGUAGES].forEach((lang, index) => {
        const el = this.doc.createElement('link');
        el.rel = 'alternate';
        el.hreflang = lang === 'US'? 'en' : lang.toLowerCase();
        el.href = 'https://' + environment.hostName + (lang === DEFAULT_LANGUAGE ? '' : '/' + lang).toLowerCase() + (alternatesLink !== '/' ? alternatesLink : '');
        if (index === 0) {
          el.hreflang = 'x-default';
        }
        this.doc.head.appendChild(el);
      });
    } else {
      alternates.forEach(
        (el) =>
          (el.href =
            'https://' +
            environment.hostName +
            (el.hreflang === 'x-default' || el.hreflang === DEFAULT_LANGUAGE ? '' : '/' + el.hreflang).toLowerCase() +
            (alternatesLink !== '/' ? alternatesLink : ''))
      );
    }
  }

  setFacebookMeta(): void {
    const el = this.doc.createElement('meta');
    el.content = FACEBOOK_DATA.CONTENT;
    el.name = FACEBOOK_DATA.NAME;
    this.doc.head.appendChild(el);
  }

  setGoogleMeta(): void {
    const el = this.doc.createElement('meta');
    el.content = GOOGLE_DATA.CONTENT;
    el.name = GOOGLE_DATA.NAME;
    this.doc.head.appendChild(el);
  }

  setYandexMeta(): void {
    const el = this.doc.createElement('meta');
    el.content = YANDEX_DATA.CONTENT;
    el.name = YANDEX_DATA.NAME;
    this.doc.head.appendChild(el);
  }

  updateTitle(
    titleLocale: string | null, // = this.store.selectSnapshot(SeoState.title).value,
    data: { [key: string]: string }, // = this.store.selectSnapshot(SeoState.title).data
  ): void {
    if (titleLocale) {
      this.translateService.stream(titleLocale, data).subscribe((title) => {
        this.updateMeta(title);
        this.title.setTitle(title);
      });
    }
  }

  updateOgUrl(url: string): void {
    this.meta.updateTag({ name: 'og:url', content: url });
    this.meta.updateTag({ name: 'twitter:url', content: url });
  }

  updateCanonicalUrl(url: string, isNotFoundPage = false): void {
    let canonicalUrl: string = url.split('?')[0];

    if(isNotFoundPage) {
      const fragments = url.match(/^(https?:\/\/[^\/?#]+)(\/[^\/?#]+)?/);
      if(fragments) {
        canonicalUrl = fragments[1] + (MyTranslateService.isAcceptedLanguage(fragments[2].slice(1)) ? fragments[2] : '') +'/not-found';
      }
    }

    const canonical: HTMLLinkElement | null = this.doc.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.href = canonicalUrl;
    } else {
      const el: HTMLLinkElement = this.doc.createElement('link');
      el.href = canonicalUrl;
      el.rel = 'canonical';
      this.doc.head.appendChild(el);
    }
  }

  updateDescription(
    descLocale: string | null, // = this.store.selectSnapshot(SeoState.description).value,
    data: { [key: string]: string }, // = this.store.selectSnapshot(SeoState.description).data
  ): void {
    if (descLocale) {
      this.translateService.stream(descLocale, data).subscribe((desc) => {
        this.meta.updateTag({ name: 'description', content: desc });
        this.meta.updateTag({ name: 'og:description', content: desc });
        this.meta.updateTag({ name: 'twitter:description', content: desc });
      });
    }
  }

  setSeoParams(route: any): void {
    const hostName = environment.hostName;
    const seoLocale = route.snapshot.data['seoLocale'];
    const languages = Object.keys(DEFAULT_LANGUAGE).filter((lang) => lang !== DEFAULT_LANGUAGE);
    if (seoLocale) {
      this.updateTitle(`${seoLocale}.TITLE`, {hostName});
      this.updateDescription(`${seoLocale}.DESCRIPTION`, {hostName});
    }
    this.setSEOIndex();

    this.updateOgUrl(`https://${environment.hostName}${this.router.url === '/' ? '' : this.router.url}`);
    this.updateCanonicalUrl(`https://${environment.hostName}${this.router.url === '/' ? '' : this.router.url}`, seoLocale === 'SEO.404');
    this.updateAlternateLinks(
      MyTranslateService.getBaseUrl(languages.includes(this.router.url.split('/')[1]) ? this.router.url.slice(3) : this.router.url)
    );
  }

  setNoIndexMeta(): void {
    this.meta.updateTag({ name: 'robots', content: 'noindex' });
  }

  setIndexMeta(): void {
    this.meta.updateTag({ name: 'robots', content: 'all' });
  }

  private setSEOIndex(): void {
    if (this.isSeoPage()) {
      this.setIndexMeta();
    } else {
      this.setNoIndexMeta();
    }
  }

  isSeoPage(): boolean {
    return true // !this.seoRoutes.includes(LanguageService.getBaseUrl(this.router.url))
  }

  updateMeta(title: string): void {
    this.meta.updateTag({ name: 'og:title', content: title });
    this.meta.updateTag({ name: 'twitter:title', content: title });
  }
}

