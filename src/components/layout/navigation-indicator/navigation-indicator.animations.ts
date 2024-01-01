import {animate, state, style, transition, trigger} from "@angular/animations";


const defaultAnimationParams = {topFrom: 12, topTo: 12, topMiddle: 12, size: 4};
export const dotIndicatorMovingAnimation =
  trigger('dotChangeAnimation', [
    state('static', style({top: '{{topTo}}px'}), {params: defaultAnimationParams}),
    state('moving', style({top: '{{topTo}}px'}), {params: defaultAnimationParams}),
    transition('static => moving', [
      style({ paddingTop: '8px', top: '{{topFrom}}px' }),
      animate('300ms', style({ paddingTop: '{{size}}px', top: '{{topMiddle}}px' })),
      animate('300ms 300ms', style({ paddingTop: '8px', top: '{{topTo}}px' })),
    ], {params: defaultAnimationParams}),
    transition('static => moving-bottom-sub', [
      style({ paddingTop: '8px', top: '{{topFrom}}px' }),
      animate('150ms', style(       { paddingTop: '28px', top: '{{topFrom}}px', opacity: 1 })),
      animate('150ms 150ms', style( { paddingTop: '0px',  top: 'calc({{topFrom}}px + 20px)', opacity: 1 })),
      animate('300ms 1ms', style(   { paddingTop: '0px',  top: 'calc({{topFrom}}px + 20px)', opacity: 0 })),
      animate('301ms 1ms', style(   { paddingTop: '0px',  top: 'calc({{topTo}}px - 20px)',  opacity: 0 })),
      animate('302ms 1ms', style(   { paddingTop: '0px',  top: 'calc({{topTo}}px - 20px)',  opacity: 1 })),
    ], {params: defaultAnimationParams}),
    transition('static => moving-top-sub', [
      style({ paddingTop: '8px', top: '{{topFrom}}px' }),
      animate('150ms', style(       { paddingTop: '28px', top: 'calc({{topFrom}}px - 20px)',  opacity: 1 })),
      animate('150ms 150ms', style( { paddingTop: '0px',  top: 'calc({{topFrom}}px - 20px)',  opacity: 1 })),
      animate('300ms 1ms', style(   { paddingTop: '0px',  top: 'calc({{topFrom}}px - 20px)',  opacity: 0 })),
      animate('301ms 1ms', style(   { paddingTop: '0px',  top: 'calc({{topTo}}px + 20px)', opacity: 0 })),
      animate('302ms 1ms', style(   { paddingTop: '0px',  top: 'calc({{topTo}}px + 20px)', opacity: 1 })),
    ], {params: defaultAnimationParams}),
  ]);

export const dotAdditionalIndicatorMovingAnimation =
  trigger('dotAdditionalChangeAnimation', [
    state('moving-bottom-sub', style({opacity: 1, top: '{{topTo}}px'}), {params: defaultAnimationParams}),
    state('moving-top-sub', style({opacity: 1, top: '{{topTo}}px'}), {params: defaultAnimationParams}),
    state('static', style({opacity: 0}), {params: defaultAnimationParams}),
    transition('static => moving-bottom-sub', [
      style({ paddingTop: '0px', top: '-8px', opacity: 0 }),
      animate('150ms 1ms', style(   { paddingTop: '0px', top: 'calc({{topTo}}px - 20px)', opacity: 1 })),
      animate('151ms 150ms', style( { paddingTop: '28px', top: 'calc({{topTo}}px - 20px)', opacity: 1 })),
      animate('451ms 150ms', style( { paddingTop: '8px', top: '{{topTo}}px', opacity: 1 })),
    ], {params: defaultAnimationParams}),
    transition('static => moving-top-sub', [
      style({ paddingTop: '0px', top: '128px', opacity: 0 }),
      animate('150ms 1ms', style(   { paddingTop: '0px', top: 'calc({{topTo}}px + 20px)', opacity: 1 })),
      animate('151ms 150ms', style( { paddingTop: '28px', top: '{{topTo}}px', opacity: 1 })),
      animate('451ms 1ms', style(   { paddingTop: '8px', top: '{{topTo}}px', opacity: 1 })),
    ], {params: defaultAnimationParams}),
  ]);
