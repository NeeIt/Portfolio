import { Injectable } from '@angular/core';
import { GTM_EVENTS } from "@constants/base/gtm-events.const";
import { environment } from "@environments/environment";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class GtmService {

  constructor() { }

  pushEvent(eventName: GTM_EVENTS, eventParams: {[key: string]: any} = {}) {
    if(!environment.production) {
      console.log(eventName);
    }

    window.dataLayer.push({
      event: GTM_EVENTS,
      ...eventParams
    });
  }
}
