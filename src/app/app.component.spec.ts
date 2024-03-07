import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LightModeService } from '@services/light-mode.service';
import { ModalService } from '@services/modals.service';
import { TabIndexService } from '@services/tab-index.service';
import { MyTranslateService } from '@services/translate.service';
import { AdaptiveService } from '@services/adaptive.service';
import { RoutingService } from '@services/routing.service';
import { SeoService } from '@services/seo.service';
import { IconsService } from '@services/icons.service';
import { SchemaService } from '@services/schema.service';
import { GtmService } from '@services/gtm.service';
import {BehaviorSubject, of} from 'rxjs';
import {MODAL_NAMES} from "@interfaces/modals.interface";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let myTranslateService: jasmine.SpyObj<MyTranslateService>;

  beforeEach(async () => {
    const currentLang$ = new BehaviorSubject({ iso2: 'en' });
    myTranslateService = jasmine.createSpyObj('MyTranslateService', [], {
      currentLang$: currentLang$.asObservable(),
      changeLang: (lang: string) => currentLang$.next({ iso2: lang })
    });
    const routingServiceMock = {
      currentLinkData$: of({}),
      nextMainPage: () => {},
      prevMainPage: () => {},
    };
    const seoServiceSpy = jasmine.createSpyObj('SeoService', ['initSeoData']);
    const schemaServiceSpy = jasmine.createSpyObj('SchemaService', ['routeChangeSubscribe']);
    const modalServiceMock = jasmine.createSpyObj('ModalService', ['openModal']);
    const lightModeServiceMock = { currentMode$: of('dark'), changeLightMode: () => {} } ;

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ AppComponent ],
      providers: [
        { provide: 'isServer', useValue: false },
        { provide: MyTranslateService, useValue: myTranslateService },
        { provide: SchemaService, useValue: schemaServiceSpy },
        { provide: LightModeService, useValue: lightModeServiceMock},
        { provide: ModalService, useValue: modalServiceMock },
        { provide: TabIndexService, useValue: { tabIndexValues$: of({}) } },
        { provide: MyTranslateService, useValue: { currentLang$: of({ iso2: 'en' }) } },
        { provide: AdaptiveService, useValue: { isMobile$: of(false) } },
        { provide: SeoService, useValue: seoServiceSpy },
        { provide: IconsService, useValue: { registerIcons: () => {} } },
        { provide: GtmService, useValue: {} },
        { provide: RoutingService, useValue: routingServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    const iconsService = TestBed.inject(IconsService);
    spyOn(iconsService, 'registerIcons');

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call IconsService.registerIcons on init', () => {
    expect(TestBed.inject(IconsService).registerIcons).toHaveBeenCalled();
  });


// Тест на проверку открытия модального окна смены языка
  it('should open language modal', () => {
    const modalService = TestBed.inject(ModalService);
    component.openLanguageModal();
    expect(modalService.openModal).toHaveBeenCalledWith(MODAL_NAMES.LANGUAGE);
  });

// Тест на проверку видимости кнопки "Наверх" при прокрутке страницы
  it('should toggle visibility of the toTop button based on scroll position', () => {
    // Имитация начального состояния страницы без прокрутки
    Object.defineProperty(window, 'pageYOffset', {value: 0, writable: true});
    Object.defineProperty(document.documentElement, 'scrollTop', {value: 0, writable: true});
    component.onWindowScroll();
    expect(component.isToTopButtonVisible).toBeFalse();

    // Имитация прокрутки страницы более чем на 200px
    Object.defineProperty(window, 'pageYOffset', {value: 500, writable: true});
    Object.defineProperty(document.documentElement, 'scrollTop', {value: 500, writable: true});
    component.onWindowScroll();
    expect(component.isToTopButtonVisible).toBeTrue();
  });

// Тест на проверку работы события переключения страницы
  it('should navigate to next or previous page based on wheel event', fakeAsync(() => {
    const routingService = TestBed.inject(RoutingService);
    spyOn(routingService, 'nextMainPage').and.returnValue(Promise.resolve(true));
    spyOn(routingService, 'prevMainPage').and.returnValue(Promise.resolve(true));

    component.currentLinkIndex = 0;
    // Имитация вращения колеса мыши вниз (переключение на следующую страницу)
    component.wheelEvent$.next(true);
    tick(1000); // Предполагаем, что throttleTime установлено в 1000 мс
    expect(routingService.nextMainPage).toHaveBeenCalled();

    component.currentLinkIndex = 0;
    // Имитация вращения колеса мыши вверх (переключение на предыдущую страницу)
    component.wheelEvent$.next(false);
    tick(1000);
    expect(routingService.prevMainPage).toHaveBeenCalled();
  }));

  // Тест на очистку подписок при уничтожении компонента
  it('should unsubscribe from all subscriptions on destroy', () => {
    const spy = spyOn(component.subscriptions, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
