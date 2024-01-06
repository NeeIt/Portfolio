import {Component, Input} from '@angular/core';
import {DEFAULT_LANGUAGE} from "@constants/base/language.const";
import {MyTranslateService} from "@services/translate.service";
import {TabIndexService} from "@services/tab-index.service";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadCrumbComponent {
  readonly defaultLang = DEFAULT_LANGUAGE;
  readonly currentLang$ = this.translateService.currentLang$;
  readonly tabIndexes$ = this.tabIndexService.tabIndexValues$;

  @Input() breadcrumbs: { title: string, url?: string }[] = [];

  constructor(
    private translateService: MyTranslateService,
    private tabIndexService: TabIndexService
  ) {
  }
}
