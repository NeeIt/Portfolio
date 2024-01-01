import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TabIndexService} from "@services/tab-index.service";
import {SKILLS} from "@constants/about/skills.const";
import {LightModeService} from "@services/light-mode.service";
import {DEFAULT_LANGUAGE} from "@constants/base/language.const";
import {MyTranslateService} from "@services/translate.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss', './about.component.media.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  readonly tabIndexes$ = this.tabIndexService.tabIndexValues$;
  readonly currentMode$ = this.lightModeService.currentMode$;
  readonly currentLang$ = this.translateService.currentLang$;

  readonly defaultLang = DEFAULT_LANGUAGE;
  readonly skills = SKILLS.filter(item => item.isMain);

  constructor(
    private readonly tabIndexService: TabIndexService,
    private readonly lightModeService: LightModeService,
    private readonly translateService: MyTranslateService,
  ){}
}
