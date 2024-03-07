import {Inject, Injectable} from "@angular/core";
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
import {map} from "rxjs";
import {LAYOUT_TYPES} from "@constants/base/layout-types.const";

@Injectable({
  providedIn: 'root'
})

export class AdaptiveService {
  public isTable$ = this.breakpointObserver.observe('(min-width: 767px) and (max-width: 1080px)').pipe(map((result: BreakpointState) => result.matches));
  public isDesktop$ = this.breakpointObserver.observe('(min-width: 1080px)').pipe(map((result: BreakpointState) => result.matches));
  public isMobile$ = this.breakpointObserver.observe('(max-width: 767px)').pipe(map((result: BreakpointState) => result.matches));
  public observe$ = this.breakpointObserver.observe(Object.values(LAYOUT_TYPES));

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    @Inject('isServer') private isServer: boolean,
  ) {}

  isTouchDevice(): boolean {
    const touchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0;
    const smallScreen = window.innerWidth < 768;
    return touchCapable && smallScreen;
  }
}
