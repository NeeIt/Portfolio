import {animate, animateChild, group, query, sequence, state, style, transition, trigger} from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
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
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [style({ top: '100%', opacity: 0 })]),
      query(':leave', animateChild()),
      group([
        query(':leave', [animate('1s ease-in-out', style({ top: '-100%', opacity: 0 }))]),
        query(':enter', [animate('1s ease-in-out', style({ top: '0%', opacity: 1 }))])
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
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [style({ top: '-100%', opacity: 0 })]),
      query(':leave', animateChild()),
      group([
        query(':leave', [animate('1s ease-in-out', style({ top: '100%', opacity: 0 }))]),
        query(':enter', [animate('1s ease-in-out', style({ top: '0%', opacity: 1 }))])
      ]),
      query(':enter', animateChild())
    ]),
    transition([
      '* => FullPage',
      'FullPage => *',
      '* => FullPageProject',
      'FullPageProject => *',
    ].join(', '), [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ opacity: 0 })
      ], { optional: true }),
      sequence([
        query(':leave', [
          animate('300ms ease-in-out', style({ opacity: 0 }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-in-out', style({ opacity: 1 }))
        ], { optional: true })
      ])
    ])
  ]);
