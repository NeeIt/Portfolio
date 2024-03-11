import { Injectable } from '@angular/core';
import {BehaviorSubject, filter} from "rxjs";
import {ActivatedRoute, ActivationEnd, NavigationEnd, Router} from "@angular/router";
import {LINKS, PAGE_TYPE} from "@constants/base/routes.const";
import {MyTranslateService} from "@services/translate.service";
import {IRoutingData} from "@interfaces/route.interface";
import {DEFAULT_LANGUAGE} from "@constants/base/language.const";

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  readonly MEDIA = {
    DESKTOP: 1080,
    BIG_TABLE: 900,
    TABLE: 767,
    BIG_MOBILE:  570,
  }

  readonly MAIN_LINKS = LINKS.filter(link => link.data.pageType === PAGE_TYPE.MAIN);

  private _currentLinkData = new BehaviorSubject<IRoutingData>({index: 0, data: {}, isSubLink: false, connected: null, nextPage: null, prevPage: null});
  currentLinkData$ = this._currentLinkData.asObservable();
  get currentLinkData(): IRoutingData {
    return this._currentLinkData.getValue();
  }

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly mTranslate: MyTranslateService,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((state: any) => {
      const data = this.getRouteData(activatedRoute);
      const mainLinks = LINKS.filter(link => link.data.pageType === PAGE_TYPE.MAIN);
      const index = mainLinks.findIndex(link => [`/${link.path}`, `/${link.path}/`, `/${link.path}sub`, `/${link.path}sub/`]
        .includes(MyTranslateService.getBaseUrl(state.url)));

      this._currentLinkData.next( {
        ...this._currentLinkData.getValue(),
        index,
        isSubLink: state.url.endsWith('sub') || state.url.endsWith('sub/'),
        connected:  data.connected ? LINKS.find(link => link.path === data.connected) : null,
        nextPage: mainLinks[index >= mainLinks.length - 1  ? 0 : index + 1],
        prevPage: mainLinks[index <= 0 ? mainLinks.length - 1 : index - 1],
        data
      });
    });
  }

  getRouteData(el: any): any {
    let data: any = {...el.snapshot.data};
    if (el.children.length > 0) {
      data = {...data, ...el.children.reduce((data: any[], el: any) => ({...data, ...this.getRouteData(el)}), [])}
    }
    return data;
  }

  nextMainPage(): Promise<boolean> {
    const routeData = this._currentLinkData.getValue();
    const currentLang = this.mTranslate.currentLang;

    const index = routeData.index >= this.MAIN_LINKS.length - 1 ? 0 : routeData.index + 1;
    return this.router.navigate([
      (currentLang?.lang === DEFAULT_LANGUAGE ? '': '/'+currentLang?.lang.toLowerCase())
      + '/' + this.MAIN_LINKS[index].path
      + ( index === 0 ? 'sub' : '')]);
  }

  prevMainPage(): Promise<boolean> {
    const routeData = this._currentLinkData.getValue();
    const currentLang = this.mTranslate.currentLang;

    const index = routeData.index <= 0 ? this.MAIN_LINKS.length - 1 : routeData.index - 1;
    return this.router.navigate([
      (currentLang?.lang === DEFAULT_LANGUAGE ? '': '/'+currentLang?.lang.toLowerCase())
      + '/' + this.MAIN_LINKS[index].path
      + ( this.MAIN_LINKS.length -1 === index ? 'sub' : '')]);
  }
}
