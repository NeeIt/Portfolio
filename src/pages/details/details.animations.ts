import {animate, state, style, transition, trigger} from "@angular/animations";

const defaultAnimationParams = {
  fixedWidth: 'calc(40% - var(--panel-margin-left) - var(--panel-margin-right) - 32px)',
  staticWidth: 'calc(100% - var(--panel-margin-left) - var(--panel-margin-right) - 32px)',
  fixedRight: 'calc(var(--panel-margin-right) + 16px)',
  staticRight: 'calc(var(--panel-margin-right) + 16px)',
  fixedLeft: 'calc(var(--panel-margin-left) + 60% + 72px)'
}

// Static -> Fixed
const fromStaticStyles = {
  position: 'fixed',
  top: '-100%',
  width: '{{staticWidth}}',
  left: 'auto',
  right: '{{staticRight}}',
  'box-shadow': '0 0 10px rgba(0, 0, 0, .5)'
}
const toFixedStyles = {
  position: 'fixed',
  top: 'calc(var(--panel-margin-top) + 16px)',
  width: '{{fixedWidth}}',
  right: '{{fixedRight}}',
  left: 'auto',
  'box-shadow': '0 0 10px rgba(0, 0, 0, 0)'
}

// Fixed -> Static
const fromFixedStyles = {
  position: 'absolute',
  top: '316px',
  width: '{{fixedWidth}}',
  right: 'auto',
  left: '{{fixedLeft}}',
  'box-shadow': '0 0 10px rgba(0, 0, 0, .5)'
}
const toStaticStyles = {
  position: 'absolute',
  top: '0',
  width: '100%',
  left: '0',
  'box-shadow': '0 0 10px rgba(0, 0, 0, 0)'
}

export const detailsMainBlockAnimation =
  trigger('detailsMainBlockAnimation', [
    state('fixed', style(toFixedStyles), {params: defaultAnimationParams}),
    transition('static => fixed', [
      style(fromStaticStyles),
      animate('450ms', style(toFixedStyles)),
    ], {params: defaultAnimationParams}),
    transition('fixed => static', [
      style(fromFixedStyles),
      animate('450ms', style(toStaticStyles)),
    ], {params: defaultAnimationParams}),
    transition('fixed => destroyed', [
      style(fromFixedStyles),
      animate('0ms', style(toStaticStyles)),
    ], {params: defaultAnimationParams}),
  ]);

export const mainDataAnimation =
  trigger('mainDataAnimation', [
    state('fixed', style({opacity: 0})),
    state('static', style({opacity: 1})),
    transition('fixed => static', [
      style({opacity: 0}),
      animate('150ms 450ms', style({opacity: 1})),
    ]),
    transition('fixed => destroyed', [
      style({opacity: 0}),
      animate('0ms 0ms', style({opacity: 1})),
    ]),
  ]);

export const fixedDataAnimation =
  trigger('fixedDataAnimation', [
    state('fixed', style({opacity: 1})),
    state('static', style({opacity: 0})),
    transition('static => fixed', [
      style({opacity: 0}),
      animate('150ms 450ms', style({opacity: 1})),
    ]),
  ]);
