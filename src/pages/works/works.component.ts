import {ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {TabIndexService} from "@services/tab-index.service";
import {COMPANIES} from "@constants/works/works.const";
import {DEFAULT_LANGUAGE} from "@constants/base/language.const";
import {MyTranslateService} from "@services/translate.service";

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss', './works.component.media.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorksComponent {
  readonly tabIndexes$ = this.tabIndexService.tabIndexValues$;
  readonly currentLang$ = this.translateService.currentLang$;

  readonly companies = Object.values(COMPANIES);
  readonly defaultLang = DEFAULT_LANGUAGE;
  constructor(
    private readonly tabIndexService: TabIndexService,
    private readonly translateService: MyTranslateService,
    @Inject('isServer') public isServer: boolean,
  ){}
}
