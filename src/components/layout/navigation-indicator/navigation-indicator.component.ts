import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {LINKS, PAGE_TYPE} from "@constants/base/routes.const";
import {NavigationEnd, Router} from "@angular/router";
import {filter , Subscription } from "rxjs";
import {dotAdditionalIndicatorMovingAnimation, dotIndicatorMovingAnimation} from "./navigation-indicator.animations";
import {RoutingService} from "@services/routing.service";
import {DEFAULT_LANGUAGE} from "@constants/base/language.const";
import {MyTranslateService} from "@services/translate.service";

@Component({
  selector: 'app-navigation-indicator',
  templateUrl: './navigation-indicator.component.html',
  styleUrls: ['./navigation-indicator.component.scss'],
  animations: [dotIndicatorMovingAnimation, dotAdditionalIndicatorMovingAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationIndicatorComponent implements OnDestroy {
  private readonly subscriptions = new Subscription();
  readonly links = LINKS.filter(link => link.data.pageType === PAGE_TYPE.MAIN);
  readonly defaultLang = DEFAULT_LANGUAGE;

  readonly currentLinkData$ = this.routingService.currentLinkData$;
  readonly currentLang$ = this.translateService.currentLang$

  animationDotStyles!: {topFrom: number, topTo: number, topMiddle: number, size: number};
  animationDotState: 'static' | 'moving' | 'moving-bottom-sub' | 'moving-top-sub' = 'static';
  checkAnimationAfterEnd = false;
  animationInitialized = false;

  constructor(
    private readonly translateService: MyTranslateService,
    private readonly routingService: RoutingService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
  ) {}

  animationEnd(event: any): void {
    switch (event.toState) {
      case 'static':
        if(this.checkAnimationAfterEnd) {
          const routeData = this.routingService.currentLinkData;

          this.updateDotAnimation(routeData.isSubLink ?
            routeData.index === 0 ?
              'moving-bottom-sub':
              'moving-top-sub' :
            'moving');
          this.checkAnimationAfterEnd = false;
        }
        break;
      case 'moving':
      case 'moving-bottom-sub':
      case 'moving-top-sub':
        this.animationDotState = 'static';
        this.animationInitialized = true;
        break
    }
  }

  updateDotAnimation(state: 'moving' | 'static' | 'moving-bottom-sub' | 'moving-top-sub' = 'moving'): void {
    const currentLinkIndex = this.routingService.currentLinkData.index
    const topFrom = this.animationDotStyles?.topTo || 12+(currentLinkIndex*32);
    const topTo = 12+(currentLinkIndex*32);

    this.animationDotStyles = {
      topFrom,
      topTo,
      topMiddle: (topFrom > topTo ? topTo : topFrom),
      size: Math.abs(topFrom - topTo - (topFrom > topTo ? -8: 8))
    };

    this.animationDotState = state;
    this.cdr.markForCheck();
  }

  ngOnInit() {
    this.subscriptions.add(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        if(this.animationDotState === 'static') {
          const routeData = this.routingService.currentLinkData;
          this.updateDotAnimation(
            routeData.isSubLink && this.animationInitialized ?
              routeData.index === 0 ?
                'moving-bottom-sub':
                'moving-top-sub' :
              'moving');
        } else {
          this.checkAnimationAfterEnd = true
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
