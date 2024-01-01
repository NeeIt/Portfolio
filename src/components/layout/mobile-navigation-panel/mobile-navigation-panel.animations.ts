import {animate, state, style, transition, trigger} from "@angular/animations";

export const fadeInOutAnimation = trigger('fadeInOut', [
  state('hidden', style({opacity: 0})),
  state('showed', style({opacity: 1})),

  transition('showed => hidden', [
    style({opacity: 1}),
    animate('150ms', style({opacity: 0})),
  ]),
  transition('hidden => showed', [
    style({opacity: 0}),
    animate('150ms', style({opacity: 1})),
  ]),
]);
