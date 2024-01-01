import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { combineLatest, Subscription } from "rxjs";

import { AdaptiveService } from "@services/adaptive.service";
import { TabIndexService } from "@services/tab-index.service";

import { detailsMainBlockAnimation, fixedDataAnimation, mainDataAnimation } from "@pages/details/details.animations";

import {ART_WORKS, EXPERIENCE_START_DATE, HOBBIES, LOCATION_PHOTOS, MY_PHOTO} from "@constants/about/about.const";
import { SOCIAL_TYPES } from "@constants/contacts/socials.const";
import { LANGUAGES } from "@constants/about/languages.const";
import { SKILLS } from "@constants/about/skills.const";
import {DEFAULT_LANGUAGE} from "@constants/base/language.const";
import {MyTranslateService} from "@services/translate.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss', './details.component.media.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ detailsMainBlockAnimation, mainDataAnimation, fixedDataAnimation ]
})
export class DetailsComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  readonly tabIndexes$ = this.tabIndexService.tabIndexValues$;
  readonly currentLang$ = this.translateService.currentLang$;

  readonly defaultLang = DEFAULT_LANGUAGE;
  readonly breadcrumbs: { title: string, url?: string }[] = [
    {title: 'SEO.ABOUT.NAVIGATION', url: '/about'},
    {title: 'SEO.DETAILS.NAVIGATION'}
  ];

  readonly tableAnimationParams = {
    fixedWidth: 'calc(40% - var(--panel-margin-left) - var(--panel-margin-right) - 32px)',
    staticWidth: 'calc(100% - var(--panel-margin-left) - var(--panel-margin-right) - 32px)',
    fixedRight: 'calc(var(--panel-margin-right) + 16px)',
    staticRight: 'calc(var(--panel-margin-right) + 16px)',
    fixedLeft: 'calc(var(--panel-margin-left) + 60% + 72px)'
  };

  readonly desktopAnimationParams = {
    fixedWidth: 'calc(31.2% - var(--panel-margin-left) - var(--panel-margin-right) - 8px)',
    staticWidth: 'calc(100% - var(--panel-margin-left) - var(--panel-margin-right) - 32px)',
    fixedRight: 'calc(var(--panel-margin-right) + 32px)',
    staticRight: 'calc(var(--panel-margin-right) + 32px)',
    fixedLeft: 'calc(78.8% + 40px)'
  };

  readonly experienceStartDate = new Date(EXPERIENCE_START_DATE);
  readonly socials = Object.entries(SOCIAL_TYPES);
  readonly locationPhotos = LOCATION_PHOTOS;
  readonly languages = LANGUAGES;
  readonly artWorks = ART_WORKS;
  readonly myPhoto = MY_PHOTO;
  readonly hobbies = HOBBIES;
  readonly skills = SKILLS;

  scrolled = false;
  mainBlockAnimationState = 'static';
  mainDataAnimationState = 'static';
  currentAdaptation = 'mobile';
  destroyed = false;

  constructor(
    private readonly translateService: MyTranslateService,
    private readonly tabIndexService: TabIndexService,
    private readonly adaptiveService: AdaptiveService,
    private readonly cdr: ChangeDetectorRef,
    @Inject('isServer') private readonly isServer: boolean,
  ){}

  @HostListener('window:scroll', ['$event'])
  checkScrollPosition(): void {
    if (this.isServer) return;
    const yCoordinate = window.pageYOffset || document.documentElement.scrollTop;
    const scrolled = this.currentAdaptation !== 'mobile' && yCoordinate > 400;
    if (!this.scrolled && scrolled || this.scrolled && !scrolled) {
      this.setAnimationState(scrolled);
    }
    this.scrolled = scrolled
  }

  private setAnimationState(scrolled = false): void {
    if (this.currentAdaptation === 'mobile') {
      this.mainBlockAnimationState = 'static';
      this.mainDataAnimationState = 'static';
    } else {
      this.mainBlockAnimationState = scrolled ? 'fixed' : this.destroyed ? 'destroyed' : 'static';

      setTimeout(() => {
        this.mainDataAnimationState = scrolled ? 'fixed' : this.destroyed ? 'destroyed' : 'static';
        this.cdr.markForCheck();
      }, 4);
    }
  }

  ngOnInit(): void {
    this.subscriptions.add(
      combineLatest([this.adaptiveService.isMobile$, this.adaptiveService.isTable$])
        .subscribe(([isMobile, isTable]) => {
          this.currentAdaptation = isMobile ? 'mobile' : isTable ? 'table' : 'desktop';
          this.checkScrollPosition();
          this.cdr.detectChanges();
        })
    )
  }

  ngOnDestroy(): void {
    this.mainBlockAnimationState = 'destroyed';
    this.mainDataAnimationState = 'destroyed';
    this.cdr.detectChanges();
    this.subscriptions.unsubscribe();
  }
}
