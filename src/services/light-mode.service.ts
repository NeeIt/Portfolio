import {Inject, Injectable} from '@angular/core';
import { Router } from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {BehaviorSubject} from "rxjs";
import {cssVariablesConst} from "@constants/base/css-variables.const";

@Injectable({
  providedIn: 'root'
})
export class LightModeService {

  private readonly _currentMode = new BehaviorSubject<'light' | 'dark'>('dark');
  currentMode$ = this._currentMode.asObservable();

  constructor(
    private readonly router: Router,
    @Inject('isServer') private isServer: boolean,
    @Inject(DOCUMENT) private _document: Document,
  ) {
    if(!this.isServer) {
      this.setStyles(this._currentMode.getValue());
    }
  }

  setStyles(mode: 'light' | 'dark') {
    const root = this._document.documentElement;
    const styles = Object.entries(cssVariablesConst);

    styles.forEach((style: [key: string, value: any]) => {
      root.style.setProperty(style[0], style[1][mode]);
    });
  }

  changeLightMode(mode: 'dark' | 'light' = (this._currentMode.getValue() === 'light'? 'dark' : 'light')): void {
    if(!this.isServer) {
      this._currentMode.next(mode);
      this.setStyles(mode);

      if (!this.isServer) {
        localStorage.setItem('light-mode', mode);
      }
    }
  }
}
