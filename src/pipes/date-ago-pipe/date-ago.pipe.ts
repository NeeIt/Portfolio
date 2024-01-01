import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { differenceInYears, differenceInMonths, differenceInDays, subYears, subMonths } from 'date-fns'

export interface IDateAgoPipeParams {
  showYears?: boolean,
  showMonths?: boolean,
  showDays?: boolean,
  combined?: boolean
}

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  constructor(private translate: TranslateService) {}

  transform(value: Date, params: IDateAgoPipeParams = { showYears: true, showMonths: true, showDays: true, combined: false }): string {
    const now = new Date();
    const years = differenceInYears(now, value);
    const totalMonths = differenceInMonths(now, value);
    const remainingMonths = totalMonths - years * 12; // Правильное вычисление оставшихся месяцев
    const days = params.showDays ? differenceInDays(now, subMonths(subYears(value, years), remainingMonths)) : 0;

    let result = '';

    if (params.combined) {
      if (params.showMonths) result += `${remainingMonths} ${this.translate.instant('DATE.MONTHS')} `;
      if (params.showDays) result += `${days} ${this.translate.instant('DATE.DAYS')}`;
    } else {
      if (params.showYears) result += `${years} ${this.translate.instant('DATE.YEARS')} `;
      if (params.showMonths) result += `${remainingMonths} ${this.translate.instant('DATE.MONTHS')} `;
      if (params.showDays) result += `${days} ${this.translate.instant('DATE.DAYS')} `;
    }

    return result.trim();
  }
}
