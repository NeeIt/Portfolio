import {ChangeDetectionStrategy, Component, Inject, Input} from '@angular/core';
import {RoutingService} from "@services/routing.service";
import {TabIndexService} from "@services/tab-index.service";
import {DOCUMENT} from "@angular/common";
import {fadeInOutAnimation} from "@components/layout/mobile-navigation-panel/mobile-navigation-panel.animations";
import {debounceTime} from "rxjs";
import {DEFAULT_LANGUAGE} from "@constants/base/language.const";
import {MyTranslateService} from "@services/translate.service";

@Component({
  selector: 'app-mobile-navigation-panel',
  templateUrl: './mobile-navigation-panel.component.html',
  styleUrls: ['./mobile-navigation-panel.component.scss', './mobile-navigation-panel.component.media.scss'],
  animations: [fadeInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileNavigationPanelComponent {
  @Input() public animationState = 'hidden';

  readonly tabIndexes$ = this.tabIndexService.tabIndexValues$;
  readonly currentLinkData$ = this.routingService.currentLinkData$.pipe(debounceTime(300));
  readonly currentLang$ = this.mTranslate.currentLang$;

  readonly defaultLang = DEFAULT_LANGUAGE;

  constructor(
    private readonly routingService: RoutingService,
    private readonly tabIndexService: TabIndexService,
    private readonly mTranslate: MyTranslateService,
  ) {}

  nextPage(): Promise<boolean> {
    return this.routingService.nextMainPage();
  }

  prevPage(): Promise<boolean> {
    return this.routingService.prevMainPage();
  }
}
