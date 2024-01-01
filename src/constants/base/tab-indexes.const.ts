import {ITabIndexValues} from "@interfaces/tab-index.interface";

export enum TAB_INDEX_MODE {
  TABLET = 'tablet',
  MODAL = 'modal',
  DESKTOP = 'desktop',
  BURGER_MENU = 'burger-menu',
}

export const TAB_INDEX_VALUES: Record<TAB_INDEX_MODE, ITabIndexValues> = {
  [TAB_INDEX_MODE.TABLET]: {
    BURGER_BUTTON: 1,
    NAVIGATION: -1,
    MAIN_CONTENT: 5,
    SETTINGS: -1,
    MODAL_NAVIGATION: -1,
    MODAL_CONTENT: -1,
    MODAL_SETTINGS: -1,
  },
  [TAB_INDEX_MODE.DESKTOP]: {
    BURGER_BUTTON: -1,
    NAVIGATION: 1,
    MAIN_CONTENT: 5,
    SETTINGS: 10,
    MODAL_NAVIGATION: -1,
    MODAL_CONTENT: -1,
    MODAL_SETTINGS: -1,
  },
  [TAB_INDEX_MODE.BURGER_MENU]: {
    BURGER_BUTTON: 1,
    NAVIGATION: 5,
    MAIN_CONTENT: -1,
    SETTINGS: 10,
    MODAL_NAVIGATION: -1,
    MODAL_CONTENT: -1,
    MODAL_SETTINGS: -1,
  },
  [TAB_INDEX_MODE.MODAL]: {
    BURGER_BUTTON: -1,
    NAVIGATION: -1,
    MAIN_CONTENT: -1,
    SETTINGS: -1,
    MODAL_NAVIGATION: 1,
    MODAL_CONTENT: 5,
    MODAL_SETTINGS: 10,
  }
}

