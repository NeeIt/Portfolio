import { TestBed } from '@angular/core/testing';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import { of } from 'rxjs';
import { AdaptiveService } from './adaptive.service';

describe('AdaptiveService', () => {
  let service: AdaptiveService;
  let breakpointObserverSpy: jasmine.SpyObj<BreakpointObserver>;

  const isMobile = false;
  const isTable = true;
  const isDesktop = true;

  beforeEach(() => {
    // Создаем мок BreakpointObserver с методом observe, возвращающим Observable
    const observeSpy = jasmine.createSpy('observe').and.callFake((query: string | string[]) => {
      if (query === '(min-width: 767px) and (max-width: 1080px)') {
        return of({ matches: isTable } as BreakpointState);
      } else if (query === '(min-width: 1080px)') {
        return of({ matches: isDesktop } as BreakpointState);
      } else if (query === '(max-width: 767px)') {
        return of({ matches: isMobile } as BreakpointState);
      }
      return of({ matches: false } as BreakpointState);
    });



    TestBed.configureTestingModule({
      // Предоставляем мок BreakpointObserver
      providers: [
        AdaptiveService,
        { provide: BreakpointObserver, useValue: { observe: observeSpy } },
        { provide: 'isServer', useValue: false }
      ]
    });

    service = TestBed.inject(AdaptiveService);
    breakpointObserverSpy = TestBed.inject(BreakpointObserver) as jasmine.SpyObj<BreakpointObserver>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should detect tablet screen size', () => {
    const breakpointState: BreakpointState = { matches: true, breakpoints: {} };
    breakpointObserverSpy.observe.and.returnValue(of(breakpointState));

    service.isTable$.subscribe(result => {
      expect(result).toEqual(isTable);
    });
    expect(breakpointObserverSpy.observe).toHaveBeenCalledWith('(min-width: 767px) and (max-width: 1080px)');
  });

  it('should detect desktop screen size', () => {
    const breakpointState: BreakpointState = { matches: true, breakpoints: {} };
    breakpointObserverSpy.observe.and.returnValue(of(breakpointState));

    service.isDesktop$.subscribe(result => {
      expect(result).toEqual(isDesktop);
    });
    expect(breakpointObserverSpy.observe).toHaveBeenCalledWith('(min-width: 1080px)');
  });

  it('should detect mobile screen size', () => {
    const breakpointState: BreakpointState = { matches: true, breakpoints: {} };
    breakpointObserverSpy.observe.and.returnValue(of(breakpointState));

    service.isMobile$.subscribe(result => {
      expect(result).toEqual(isMobile);
    });
    expect(breakpointObserverSpy.observe).toHaveBeenCalledWith('(max-width: 767px)');
  });

  it('should detect touch device', () => {
    Object.defineProperty(window, 'innerWidth', {value: 500, writable: true});
    Object.defineProperty(window, 'ontouchstart', {value: () => {}, writable: true});
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: 1,
      writable: true
    });

    expect(service.isTouchDevice()).toBeTrue();
  });
});
