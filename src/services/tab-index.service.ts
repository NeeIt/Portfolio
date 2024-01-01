import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TAB_INDEX_MODE, TAB_INDEX_VALUES} from "@constants/base/tab-indexes.const";
import {ITabIndexValues} from "@interfaces/tab-index.interface";
import {AdaptiveService} from "@services/adaptive.service";


@Injectable({
  providedIn: 'root'
})
export class TabIndexService {
  private readonly _tabIndexValues = new BehaviorSubject<ITabIndexValues>(TAB_INDEX_VALUES[TAB_INDEX_MODE.TABLET]);
  readonly tabIndexValues$ = this._tabIndexValues.asObservable();
  private readonly _currentTabIndexMode = new BehaviorSubject<TAB_INDEX_MODE>(TAB_INDEX_MODE.TABLET);
  readonly currentTabIndexMode$ =this._currentTabIndexMode.asObservable();

  private tabIndexStack: TAB_INDEX_MODE[] = [TAB_INDEX_MODE.TABLET];

  constructor(
    @Inject('isServer') private isServer: boolean,
    private readonly adaptiveService: AdaptiveService
  ) {

    adaptiveService.isDesktop$.subscribe((isDesktop) => {
      if (this.tabIndexStack[0] === TAB_INDEX_MODE.DESKTOP && !isDesktop) {
        this.setDefaultTabIndexMode(TAB_INDEX_MODE.TABLET)
      } else if (this.tabIndexStack[0] === TAB_INDEX_MODE.TABLET && isDesktop) {
        this.setDefaultTabIndexMode(TAB_INDEX_MODE.DESKTOP)
      }
    });

    if(!this.isServer) {
      document.addEventListener('focus', function(e) {
        console.log('Элемент в фокусе:', e.target);
      }, true); // Использование true для захвата события в фазе захвата
    }
  }

  setTabIndexMode(tabIndexMode: TAB_INDEX_MODE): void {
    this.tabIndexStack.push(tabIndexMode);
    this.applyTabIndex(tabIndexMode);
  }

  private applyTabIndex(tabIndexMode: TAB_INDEX_MODE): void {
    this._tabIndexValues.next(TAB_INDEX_VALUES[tabIndexMode]);
    this._currentTabIndexMode.next(tabIndexMode);
  }

  private setDefaultTabIndexMode(tabIndexMode: TAB_INDEX_MODE): void {
    this.tabIndexStack[0] = tabIndexMode;
    if(this.tabIndexStack.length <= 1) {
      this.applyTabIndex(tabIndexMode);
    }
  }

  restorePreviousTabIndex(): void {
    this.tabIndexStack.pop();
    if (this.tabIndexStack.length > 0) {
      this.applyTabIndex(this.tabIndexStack[this.tabIndexStack.length - 1]);
    }
  }
}
