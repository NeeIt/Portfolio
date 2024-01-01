import {animate, animateChild, group, query, state, style, transition, trigger} from "@angular/animations";

export const titleAnimation = trigger('titleAnimation', [
  transition(
    [
      'NotFound => Home',
      'Home => Works',
      'Home => About',
      'Home => Contact',
      'About => Works',
      'About => Contact',
      'Works => Contact',
      'Contact => HomeSub',
      'ContactSub => HomeSub',
      'HomeSub => Works',
      'HomeSub => About',
      'HomeSub => Contact',
    ].join(', '), [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({opacity: '1', transform: 'translateX(0px) translateY(-50%)'})
      ]),
      query(':enter', [style({opacity: '0', transform: 'translateX(500px) translateY(-50%)'})]),
      query(':leave', animateChild()),
      group([
        query(':leave', [animate('1s ease-out', style({opacity: '0', transform: 'translateX(-500px) translateY(-50%)'}))]),
        query(':enter', [animate('1s ease-out', style({opacity: '1', transform: 'translateX(0px) translateY(-50%)'}))])
      ]),
      query(':enter', animateChild())
    ]),
  transition([
    'Contact => Home',
    'Contact => About',
    'Contact => Works',
    'Works => Home',
    'Works => About',
    'About => Home',
    'Home => ContactSub',
    'HomeSub => ContactSub',
    'ContactSub => Home',
    'ContactSub => About',
    'ContactSub => Works',
  ].join(', '), [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({opacity: '1', transform: 'translateX(0px) translateY(-50%)'})
    ]),
    query(':enter', [style({opacity: '0', transform: 'translateX(-500px) translateY(-50%)'})]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('1s ease-out', style({opacity: '0', transform: 'translateX(500px) translateY(-50%)'}))]),
      query(':enter', [animate('1s ease-out', style({opacity: '1', transform: 'translateX(0px) translateY(-50%)'}))])
    ]),
    query(':enter', animateChild())
  ]),
  transition(':leave', [
    query(
      ':self',
      [style({ opacity: 1 }), animate('300ms ease', style({ opacity: 0}))],
      { optional: true }
    ),
  ]),
]);
