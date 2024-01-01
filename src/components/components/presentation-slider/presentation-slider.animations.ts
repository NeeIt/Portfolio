import {animate, style, transition, trigger} from "@angular/animations";

export const sliderAnimation = trigger('slide', [
  transition('* => start', [
    style({ transform: 'translateX({{translateFrom}})' }),
    animate('20000ms linear', style({ transform: 'translateX({{translateTo}})' }))
  ]),
  transition('* => end', [
    style({ transform: 'translateX({{translateTo}})' }),
    animate('0ms', style({ transform: 'translateX({{translateFrom}})' }))
  ])
]);
