import { TestBed } from '@angular/core/testing';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {NavigationEnd, Router} from '@angular/router';
import { of } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import {MyTranslateService} from "@services/translate.service";

describe('MyTranslateService', () => {
  let service: MyTranslateService;
  let transferStateSpy: jasmine.SpyObj<TransferState>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let documentMock: Document;

  beforeEach(() => {
    const mockTransferState = jasmine.createSpyObj('TransferState', ['get', 'set']);
    const mockTranslateService = jasmine.createSpyObj('TranslateService', ['use']);
    const mockRouter = jasmine.createSpyObj('Router', ['navigate'], {
      events: of(new NavigationEnd(0, '/', '/')),
      url: '/'
    });
    documentMock = document;

    TestBed.configureTestingModule({
      providers: [
        MyTranslateService,
        { provide: TransferState, useValue: mockTransferState },
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: Router, useValue: mockRouter },
        { provide: DOCUMENT, useValue: documentMock },
        { provide: 'isServer', useValue: false }
      ]
    });

    service = TestBed.inject(MyTranslateService);
    transferStateSpy = TestBed.inject(TransferState) as jasmine.SpyObj<TransferState>;
    translateServiceSpy = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set initial language based on TransferState', () => {
    const langKey = makeStateKey('selected-language');
    transferStateSpy.get.and.returnValue('US');
    // Reinitialize service to apply new mock behavior
    service = TestBed.inject(MyTranslateService);
    expect(translateServiceSpy.use).toHaveBeenCalledWith('US');
  });

  it('should change language and update HTML lang attribute', () => {
    const spySetAttribute = spyOn(document.documentElement, 'setAttribute');
    service.changeLang('FR');
    expect(translateServiceSpy.use).toHaveBeenCalledWith('FR');
    expect(spySetAttribute).toHaveBeenCalledWith('lang', 'fr');
  });

  it('should navigate to the new language route', () => {
    service = TestBed.inject(MyTranslateService); // Re-inject service to apply override
    service.changeLang('DE', true);
    expect(routerSpy.navigate).toHaveBeenCalled();
    expect(localStorage.getItem('me-lang')).toBe('DE');
  });
});
