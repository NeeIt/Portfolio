import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations";

export const slideInAnimation =
  trigger('burgerAnimation', [
    transition('closed => opened', [
      style({}),
      animate('', style({}))
      ]),
    transition('opened => closed', [
      style({}),
      animate('', style({}))
    ])
  ]);
