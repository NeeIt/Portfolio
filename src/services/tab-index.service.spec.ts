import { TAB_INDEX_MODE } from "@constants/base/tab-indexes.const";
import {TestBed} from "@angular/core/testing";
import {TabIndexService} from "@services/tab-index.service";
import {BehaviorSubject, of} from "rxjs";
import {AdaptiveService} from "@services/adaptive.service";

describe('TabIndexService', () => {
  let service: TabIndexService;
  let adaptiveServiceSpy: jasmine.SpyObj<AdaptiveService>;
  let isDesktopSubject: BehaviorSubject<boolean>;

  beforeEach(() => {
    isDesktopSubject = new BehaviorSubject<boolean>(true); // Изначально устанавливаем, что устройство является десктопным
    adaptiveServiceSpy = jasmine.createSpyObj('AdaptiveService', [], {
      isDesktop$: isDesktopSubject.asObservable() // Используем BehaviorSubject для мока
    });


    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      providers: [
        TabIndexService,
        { provide: AdaptiveService, useValue: adaptiveServiceSpy },
        { provide: 'isServer', useValue: false }
      ]
    });
    // Inject both the service-to-test and its (spy) dependency
    service = TestBed.inject(TabIndexService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set desktop tabIndex mode when isDesktop$ emits true', (done: DoneFn) => {
    // BehaviorSubject уже эмитил true при инициализации, проверяем это состояние
    service.currentTabIndexMode$.subscribe(mode => {
      expect(mode).toBe(TAB_INDEX_MODE.DESKTOP);
      done();
    });
  });

  it('should set tablet tabIndex mode when isDesktop$ emits false', (done: DoneFn) => {
    isDesktopSubject.next(false); // Изменяем значение на false

    service.currentTabIndexMode$.subscribe(mode => {
      expect(mode).toBe(TAB_INDEX_MODE.TABLET);
      done();
    });
  });

  it('should restore previous tabIndex mode', (done: DoneFn) => {
    isDesktopSubject.next(false); // Изменяем значение на false

    // Устанавливаем режим и пытаемся восстановить предыдущий
    service.setTabIndexMode(TAB_INDEX_MODE.DESKTOP);
    service.restorePreviousTabIndex();

    service.currentTabIndexMode$.subscribe(mode => {
      // Ожидаем, что режим вернется к начальному (TABLET, установленному после эмита false)
      expect(mode).toBe(TAB_INDEX_MODE.TABLET);
      done();
    });

    isDesktopSubject.next(false); // Эмитим false, чтобы инициировать переключение режима
  });
});
