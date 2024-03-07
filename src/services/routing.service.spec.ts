import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RoutingService } from './routing.service';
import { MyTranslateService } from '@services/translate.service';
import { IRoutingData } from '@interfaces/route.interface';
import {LINKS} from "@constants/base/routes.const";

describe('RoutingService', () => {
  let service: RoutingService;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let translateServiceSpy: jasmine.SpyObj<MyTranslateService>;
  let routerEvents: BehaviorSubject<any>;

  beforeEach(() => {
    routerEvents = new BehaviorSubject({});
    routerSpy = jasmine.createSpyObj('Router', ['navigate'], { events: routerEvents.asObservable() });
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: { data: {} }, children: [] });
    translateServiceSpy = jasmine.createSpyObj('MyTranslateService', ['getBaseUrl'], { currentLang: 'en' });

    TestBed.configureTestingModule({
      providers: [
        RoutingService,
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: MyTranslateService, useValue: translateServiceSpy }
      ]
    });

    service = TestBed.inject(RoutingService);
  });

  it('should update current link data on navigation end', () => {
    // Имитация данных маршрута
    const expectedData = LINKS[0]

    // Подмена реализации метода getRouteData для возвращения ожидаемых данных маршрута
    spyOn(service, 'getRouteData').and.returnValue(expectedData.data);

    // Имитация события NavigationEnd
    routerEvents.next(new NavigationEnd(1, '/'+ expectedData.path, '/' + expectedData.path));

    service.currentLinkData$.subscribe(data => {
      expect(data.data.seoLocale).toEqual(expectedData.data.seoLocale);
      expect(data.data.isSeoPage).toEqual(expectedData.data.isSeoPage);
      expect(data.data.schemaKey).toEqual(expectedData.data.schemaKey);
    });
  });
});
