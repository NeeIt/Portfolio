import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SeoService } from './seo.service';
import { DOCUMENT } from '@angular/common';
import {environment} from "@environments/environment";
import {FACEBOOK_DATA} from "@constants/base/seo.const";
import {of} from "rxjs";

describe('SeoService', () => {
  let service: SeoService;
  let meta: Meta;
  let titleService: Title;
  let document: Document;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        SeoService,
        { provide: 'isServer', useValue: false }
      ]
    });
    service = TestBed.inject(SeoService);
    meta = TestBed.inject(Meta);
    titleService = TestBed.inject(Title);
    document = TestBed.inject(DOCUMENT);
    translateService = TestBed.inject(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setCommonMeta should update common meta tags', () => {
    const spy = spyOn(meta, 'updateTag');
    service.setCommonMeta();
    expect(spy).toHaveBeenCalledWith({ name: 'og:image', content: jasmine.any(String) });
    expect(spy).toHaveBeenCalledWith({ name: 'twitter:image', content: jasmine.any(String) });
    // Add more expects based on how many times updateTag should be called
  });

  it('updateTitle should set page title', () => {
    const translateService = TestBed.inject(TranslateService);
    spyOn(translateService, 'stream').and.returnValue(of('Translated Title'));
    const titleSpy = spyOn(titleService, 'setTitle');
    service.updateTitle('SOME_KEY', {});
    expect(titleSpy).toHaveBeenCalledWith('Translated Title');
  });

  it('updateAlternateLinks should add alternate links for available languages', () => {
    const alternatesLink = '/test';
    service.updateAlternateLinks(alternatesLink);
    const alternates: NodeListOf<HTMLLinkElement> = document.querySelectorAll('link[rel="alternate"]');
    expect(alternates.length).toBeGreaterThan(0);
    alternates.forEach((el, index) => {
      expect(el.href).toContain(environment.hostName);
      if (index === 0) {
        expect(el.hreflang).toEqual('x-default');
      } else {
        expect(['en', 'ru', 'ua', 'jp']).toContain(el.hreflang); // Пример, замените на актуальные значения
      }
    });
  });

  it('setFacebookMeta should add Facebook meta tag', () => {
    const spy = spyOn(document.head, 'appendChild').and.callThrough();
    service.setFacebookMeta();
    expect(spy).toHaveBeenCalled();
    const el: HTMLMetaElement | null = document.querySelector('meta[name="' + FACEBOOK_DATA.NAME + '"]');
    expect(el).not.toBeNull();
    expect(el?.content).toEqual(FACEBOOK_DATA.CONTENT);
  });

  it('updateCanonicalUrl should update canonical link', () => {
    const url = 'https://example.com/test';
    service.updateCanonicalUrl(url);
    const canonical: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    expect(canonical).not.toBeNull();
    expect(canonical?.href).toEqual(url);
  });

  it('setNoIndexMeta should update robots meta tag to noindex', () => {
    service.setNoIndexMeta();
    const metaTag: HTMLMetaElement | null = document.querySelector('meta[name="robots"]');
    expect(metaTag).not.toBeNull();
    expect(metaTag?.content).toEqual('noindex');
  });

  it('setIndexMeta should update robots meta tag to all', () => {
    service.setIndexMeta();
    const metaTag: HTMLMetaElement | null = document.querySelector('meta[name="robots"]');
    expect(metaTag).not.toBeNull();
    expect(metaTag?.content).toEqual('all');
  });

// Дополнительные тесты для проверки обновления описаний и URL для Open Graph и Twitter
  it('updateDescription should set description meta tags', fakeAsync(() => {
    const desc = 'Test Description';
    spyOn(translateService, 'stream').and.returnValue(of(desc));
    service.updateDescription('SOME_KEY', {});
    tick();
    const descriptionMeta: HTMLMetaElement | null = document.querySelector('meta[name="description"]');
    const ogDescriptionMeta: HTMLMetaElement | null = document.querySelector('meta[name="og:description"]');
    const twitterDescriptionMeta: HTMLMetaElement | null = document.querySelector('meta[name="twitter:description"]');
    expect(descriptionMeta?.content).toEqual(desc);
    expect(ogDescriptionMeta?.content).toEqual(desc);
    expect(twitterDescriptionMeta?.content).toEqual(desc);
  }));

});
