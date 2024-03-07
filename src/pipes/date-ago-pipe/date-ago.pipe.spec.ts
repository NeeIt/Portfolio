import { DateAgoPipe } from './date-ago.pipe';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from "@ngx-translate/core";
import * as dateFns from 'date-fns';

describe('DateAgoPipe', () => {
  let pipe: DateAgoPipe;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TranslateService', ['instant']);
    TestBed.configureTestingModule({
      providers: [
        DateAgoPipe,
        { provide: TranslateService, useValue: spy }
      ]
    });
    pipe = TestBed.inject(DateAgoPipe);
    translateServiceSpy = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;

    // Mock the TranslateService response
    translateServiceSpy.instant.and.callFake((key: string) => {
      if(key === 'DATE.YEARS') return 'years';
      if(key === 'DATE.MONTHS') return 'months';
      if(key === 'DATE.DAYS') return 'days';
      return key;
    });
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should display years, months, and days separately', () => {
    const testDate = dateFns.subYears(new Date(), 1); // 1 year ago
    const formattedDate = pipe.transform(testDate, { showYears: true, showMonths: true, showDays: true, combined: false });
    expect(formattedDate).toContain('years');
    expect(formattedDate).toContain('months');
    expect(formattedDate).toContain('days');
  });

  it('should combine months and days if combined is true', () => {
    const testDate = new Date();
    // Устанавливаем дату так, чтобы она гарантированно содержала и месяцы, и дни
    testDate.setMonth(testDate.getMonth() - 2); // 2 месяца назад
    testDate.setDate(testDate.getDate() - 10); // и 10 дней назад

    const result = pipe.transform(testDate, { showYears: false, showMonths: true, showDays: true, combined: true });
    expect(result).toContain('months');
    expect(result).toContain('days');
  });

  it('should display only years if only showYears is true', () => {
    const testDate = dateFns.subYears(new Date(), 2); // 2 years ago
    const formattedDate = pipe.transform(testDate, { showYears: true, showMonths: false, showDays: false, combined: false });
    expect(formattedDate).toContain('2 years');
    expect(formattedDate).not.toContain('months');
    expect(formattedDate).not.toContain('days');
  });
});
