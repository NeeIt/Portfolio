import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Inject, Renderer2} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {slideInAnimation} from "./app.animations";
import {debounceTime, filter, skip, Subject, Subscription, take, throttleTime} from "rxjs";
import {PAGE_TYPE} from "@constants/base/routes.const";
import {RoutingService} from "@services/routing.service";
import {DOCUMENT} from "@angular/common";
import {LightModeService} from "@services/light-mode.service";
import {TranslateService} from "@ngx-translate/core";
import {MyTranslateService} from "@services/translate.service";
import {ModalService} from "@services/modals.service";
import {IconsService} from "@services/icons.service";
import {AdaptiveService} from "@services/adaptive.service";
import {SeoService} from "@services/seo.service";
import {MODAL_NAMES} from "@interfaces/modals.interface";
import {makeStateKey, StateKey, TransferState} from "@angular/platform-browser";
import {SchemaService} from "@services/schema.service";
import {TabIndexService} from "@services/tab-index.service";
import {GtmService} from "@services/gtm.service";
import {DEFAULT_LANGUAGE} from "@constants/base/language.const";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './app.component.media.scss'],
  animations: [slideInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly subscriptions = new Subscription();

  readonly currentLang$ = this.mTranslate.currentLang$;
  readonly currentMode$ = this.lightModeService.currentMode$;
  readonly wheelEvent$ = new Subject<boolean>();
  readonly isMobile$ = this.adaptiveService.isMobile$;
  readonly tabIndexes$ = this.tabIndexService.tabIndexValues$;
  readonly modals$ = this.modalService.modals$;
  readonly currentLinkData$ = this.routingService.currentLinkData$;

  readonly IS_FULL_PAGE_KEY: StateKey<number> = makeStateKey<number>('is-full-page');
  readonly defaultLang = DEFAULT_LANGUAGE;

  isFullPage: boolean = this.transferState.get(this.IS_FULL_PAGE_KEY, false as any);

  isShortPage = false;
  currentLinkIndex = -1;
  scrolled = false;
  isToTopButtonVisible = false;
  pageAnimationInitialized = false;

  mobileButtonAnimationState = 'showed'; // Состояние мобильных кнопок

  private isScrollDelayed = true;
  private isScrollAvailable = false;
  private scrollEvents = new Subject<void>();
  private debounceTime = 300;

  constructor(
    private readonly lightModeService: LightModeService,
    private readonly adaptiveService: AdaptiveService,
    private readonly transferState: TransferState,
    private readonly routingService: RoutingService,
    private readonly mTranslate: MyTranslateService,
    private readonly translate: TranslateService,
    private readonly modalService: ModalService,
    private readonly iconsService: IconsService,
    private readonly seoService: SeoService,
    private readonly schemaService: SchemaService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    private readonly renderer: Renderer2,
    private readonly tabIndexService: TabIndexService,
    private readonly gtmService: GtmService,

    @Inject('isServer') private isServer: boolean,
    @Inject(DOCUMENT) private _document: Document,
  ) {
    this.iconsService.registerIcons();
    this.translate.setDefaultLang('EN');
    this.seoService.initSeoData();
    this.schemaService.routeChangeSubscribe();
  }

  // ----- EVENTS ------

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const yCoordinate = window.pageYOffset || document.documentElement.scrollTop;
    this.isToTopButtonVisible = yCoordinate > 200;
  }


  @HostListener("document:keydown", ["$event"])
  keyPress(event: any) {
    if(!this.isFullPage && ['ArrowDown', 'ArrowUp'].includes(event.code)) {
      this.wheelEvent$.next(event.code === 'ArrowDown');
    }
  }

  @HostListener("document:wheel", ["$event"])
  scroll(event: any) {
    if (window.innerWidth >= this.routingService.MEDIA.TABLE && !this.isFullPage) {
      const scrollableElement = document.documentElement || document.body; // Адаптируйте для вашего элемента
      const { scrollTop, clientHeight, scrollHeight } = scrollableElement;

      // ---------------------------------------------
      const isCurrentlyAtBottom = Math.round(scrollTop + clientHeight) >= scrollHeight;
      const isCurrentlyAtTop = scrollTop <= 0;
      let isGoingToScrollToBottom = false;
      let isGoingToScrollToTop = false;

      if (event.deltaY > 0) {
        // isGoingToScrollToBottom = !isCurrentlyAtBottom && (scrollTop + clientHeight + event.deltaY) >= scrollHeight;
        isGoingToScrollToTop = false;
      } else {
        // isGoingToScrollToTop = !isCurrentlyAtTop && (scrollTop + event.deltaY) <= 0;
        isGoingToScrollToBottom = false;
      }

      const endTop = (isCurrentlyAtTop || isGoingToScrollToTop) && event.deltaY < 0;
      const endBottom = (isCurrentlyAtBottom || isGoingToScrollToBottom) && event.deltaY > 0;
      // ---------------------------------------------

      if (this.isScrollAvailable || this.isScrollDelayed || endTop) {
        if (endBottom || endTop) {
          this.wheelEvent$.next(event.deltaY > 0);
          this.scrolled = true;
          this.isScrollDelayed = false;
        }
      } else {
        if(endBottom /*|| endTop*/) {
          this.scrollEvents.next();
        }
      }
    }
  }

  // ----- METHODS ------

  openLanguageModal(): void {
    this.modalService.openModal(MODAL_NAMES.LANGUAGE);
  }

  onRouterAnimationStart(animationState: string) {
    if(!this.pageAnimationInitialized && animationState) {
      this.pageAnimationInitialized = true;
      return;
    }
    const outletElement = this._document.querySelector('router-outlet');
    const oldComponentElem = outletElement?.nextElementSibling;
    this.mobileButtonAnimationState = 'hidden';
    if (oldComponentElem) {
      this.renderer.setAttribute(oldComponentElem, 'aria-hidden', 'true');
      const focusableElements = oldComponentElem.querySelectorAll('[tabindex]');

      focusableElements.forEach(el => {
        this.renderer.setAttribute(el, 'tabindex', '-1');
      });
    }
  }

  onRouterAnimationDone() {
    if (this.currentLinkIndex === -1) return;
    const scrollableElement = this._document.scrollingElement || this._document.documentElement;
    this.isScrollAvailable = scrollableElement.scrollHeight <= scrollableElement.clientHeight;
    this.mobileButtonAnimationState = 'showed';
    const outletElement = this._document.querySelector('router-outlet');
    const oldComponentElem = outletElement?.nextElementSibling;
    if (oldComponentElem) {
      this.renderer.setAttribute(oldComponentElem, 'aria-hidden', 'false');
    }
  }

  scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  // NOTE: Decided that mobile will not have this
  //
  // touchStartPos!: number;
  // @HostListener("document:touchstart", ["$event"])
  // touchStart(event: any) {
  //   this.touchStartPos = event.touches[0].clientY;
  // }
  //
  // @HostListener("document:touchend", ["$event"])
  // swap(event: any) {
  //   var touchEnd = event.changedTouches[0].clientY;
  //   if(this.touchStartPos > touchEnd+5){
  //     this.wheelEvent$.next(true);
  //   }else if(this.touchStartPos < touchEnd-5){
  //     this.wheelEvent$.next(false);
  //   }
  // }

  nextPage(): Promise<boolean> {
    return this.routingService.nextMainPage();
  }

  prevPage(): Promise<boolean> {
   return this.routingService.prevMainPage();
  }

  // ----- ANGULAR LIFE CYCLE ------

  ngOnInit(): void {
    if(!this.isServer) {
      // setTimeout to smooth change light mode
      setTimeout(() => {
        this.lightModeService.changeLightMode(!this.isServer ? <'light' | 'dark'>localStorage.getItem('light-mode') || 'dark' : 'dark')
      });

      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        take(1)
      ).subscribe(() => {
        this.mTranslate.setLocalStorageLang();
      });

      this.subscriptions.add(
        this.wheelEvent$.pipe(
          throttleTime(1300, undefined, {leading: true, trailing: false}),
        ).subscribe((isDown: boolean) => {
          if(this.modalService.isAnyModalOpened()) return;
          this.isShortPage = false;
          this.isScrollAvailable = false;
          if(this.currentLinkIndex !== -1) {
            if(isDown) {
              this.nextPage();
            } else {
              this.prevPage();
            }
          } else {
            this.currentLinkIndex = 1;
            this.prevPage();
          }
        })
      );

      this.subscriptions.add(
        this.scrollEvents.pipe(debounceTime(this.debounceTime)).subscribe(() => {
          this.isScrollDelayed = true;
        })
      );
    }

    this.subscriptions.add(
      this.routingService.currentLinkData$.pipe(skip(1)).subscribe(val => {
        this.currentLinkIndex = val.index;
        this.isFullPage = val.data.pageType === PAGE_TYPE.FULL_PAGE;
        this.transferState.set(this.IS_FULL_PAGE_KEY, this.isFullPage as any);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
