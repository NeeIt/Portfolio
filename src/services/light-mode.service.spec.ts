import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { LightModeService } from './light-mode.service';
import { cssVariablesConst } from '@constants/base/css-variables.const';
import {skip} from "rxjs";

describe('LightModeService', () => {
  let service: LightModeService;
  let mockDocument: any;

  beforeEach(() => {
    // Создание мока для DOCUMENT
    mockDocument = {
      documentElement: { style: { setProperty: jasmine.createSpy('setProperty') } },
      querySelectorAll: jasmine.createSpy('querySelectorAll').and.returnValue([])
    };

    TestBed.configureTestingModule({
      providers: [
        LightModeService,
        { provide: Router, useValue: {} },
        { provide: 'isServer', useValue: false },
        { provide: DOCUMENT, useValue: mockDocument }
      ]
    });

    service = TestBed.inject(LightModeService);
    spyOn(localStorage, 'setItem');
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should set styles correctly for light mode', () => {
    const expectedCalls = Object.entries(cssVariablesConst).length;
    expect(mockDocument.documentElement.style.setProperty.calls.count()).toEqual(expectedCalls);

    service.setStyles('light');

    // Проверяем, был ли setProperty вызван для каждого CSS-переменной
    expect(mockDocument.documentElement.style.setProperty.calls.count()).toEqual(expectedCalls * 2);

    // Проверяем, вызывается ли setProperty с правильными параметрами для первой переменной
    const firstStyle = Object.entries(cssVariablesConst)[0];
    expect(mockDocument.documentElement.style.setProperty).toHaveBeenCalledWith(firstStyle[0], firstStyle[1]['light']);
  });

  it('should change light mode and update localStorage', (done: DoneFn) => {
    const newMode = 'light';
    service.currentMode$.pipe(skip(1)).subscribe(mode => {
      console.log(mode);
      expect(mode).toEqual(newMode);
      done();
    });
    service.changeLightMode(newMode);
    expect(localStorage.setItem).toHaveBeenCalledWith('light-mode', 'light');
  });
});
