import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {LINKS, PAGE_TYPE} from "@constants/base/routes.const";
import {RoutingService} from "@services/routing.service";
import {LightModeService} from "@services/light-mode.service";
import {ModalService} from "@services/modals.service";
import {MyTranslateService} from "@services/translate.service";
import {DEFAULT_LANGUAGE} from "@constants/base/language.const";
import {MODAL_NAMES} from "@interfaces/modals.interface";
import {TabIndexService} from "@services/tab-index.service";
import {AdaptiveService} from "@services/adaptive.service";
import {TAB_INDEX_MODE} from "@constants/base/tab-indexes.const";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss', './navigation.component.media.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit, OnDestroy{
  private readonly subscriptions = new Subscription();

  readonly links = LINKS.filter(link => link.data.pageType === PAGE_TYPE.MAIN);
  readonly defaultLang = DEFAULT_LANGUAGE;
  readonly currentYear = new Date().getFullYear();

  readonly currentLinkData$ = this.routingService.currentLinkData$;
  readonly lightMode$ = this.lightModeService.currentMode$;
  readonly currentLang$ = this.translateService.currentLang$;
  readonly tabIndexes$ = this.tabIndexService.tabIndexValues$;
  readonly isDesktop$ = this.adaptiveService.isDesktop$;
  readonly isTable$ = this.adaptiveService.isTable$;

  isOpened = false;
  isTable = false;

  constructor(
    private readonly translateService: MyTranslateService,
    private readonly lightModeService: LightModeService,
    private readonly routingService: RoutingService,
    private readonly cdr: ChangeDetectorRef,
    private readonly modalService: ModalService,
    private readonly tabIndexService: TabIndexService,
    private readonly adaptiveService: AdaptiveService,
  ) {
  }

  closeNavigation(): void {
    this.isOpened = false;
    this.cdr.markForCheck();
  }

  changeMenuState(): void {
    this.isOpened = !this.isOpened;
    if (this.isOpened) {
      this.tabIndexService.setTabIndexMode(TAB_INDEX_MODE.BURGER_MENU);
    } else {
      this.tabIndexService.restorePreviousTabIndex();
    }
    this.cdr.markForCheck();
  }

  clickTableOverflow(event: MouseEvent): void {
    if (event.target === event.currentTarget && this.isTable) {
      this.closeNavigation();
    }
  }

  openLanguageModal(): void {
    this.modalService.openModal(MODAL_NAMES.LANGUAGE);
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.isDesktop$.subscribe((isDesktop: boolean) => {
        this.closeNavigation();
      })
    );

    this.subscriptions.add(
      this.isTable$.subscribe((isTable: boolean) => {
        this.isTable = isTable;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
