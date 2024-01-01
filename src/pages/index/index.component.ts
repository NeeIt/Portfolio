import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MyTranslateService} from "@services/translate.service";
import {TabIndexService} from "@services/tab-index.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss', './index.component.media.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent {
  readonly currentLang$ = this.translateService.currentLang$
  readonly tabIndexes$ = this.tabIndexService.tabIndexValues$;

  constructor(
    private readonly tabIndexService: TabIndexService,
    private readonly translateService: MyTranslateService,
  ) {}
}
