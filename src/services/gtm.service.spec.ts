import { TestBed } from '@angular/core/testing';
import { GtmService } from './gtm.service';
import { GTM_EVENTS } from "@constants/base/gtm-events.const";
import { environment } from "@environments/environment";

describe('GtmService', () => {
  let service: GtmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GtmService);

    // Мокаем window.dataLayer
    Object.defineProperty(window, 'dataLayer', { value: [], writable: true });
  });

  it('should push event to dataLayer', () => {
    const testEventName = GTM_EVENTS.TEST_EVENT;
    const testParams = { param1: 'value1', param2: 'value2' };

    service.pushEvent(testEventName, testParams);

    // Проверяем, что в dataLayer был добавлен корректный объект события
    expect(window.dataLayer.length).toBe(1);
    expect(window.dataLayer[0].event).toEqual(GTM_EVENTS);
    expect(window.dataLayer[0].param1).toEqual('value1');
    expect(window.dataLayer[0].param2).toEqual('value2');
  });

  it('should log event name if not in production', () => {
    const testEventName = GTM_EVENTS.TEST_EVENT;

    // Мокаем console.log
    const consoleSpy = spyOn(console, 'log');

    // Устанавливаем environment.production в false для теста
    const originalEnv = environment.production;
    environment.production = false;

    service.pushEvent(testEventName);

    // Проверяем, был ли вызван console.log с правильным именем события
    expect(consoleSpy).toHaveBeenCalledWith(testEventName);

    // Возвращаем environment.production к исходному состоянию
    environment.production = originalEnv;
  });
});
