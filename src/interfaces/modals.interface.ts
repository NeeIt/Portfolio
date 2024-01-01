// TODO: not here
import {LanguageModalComponent} from "@modals/language-modal/language-modal.component";
import {LanguageModalModule} from "@modals/language-modal/language-modal.module";
import {PhotoModalComponent} from "@modals/photo-modal/photo-modal.component";
import {PhotoModalModule} from "@modals/photo-modal/photo-modal.module";

export interface IModal {
  name: MODAL_NAMES;
  componentRef: any;
  index: number;
}
export enum MODAL_NAMES {
  LANGUAGE = 'language',
  PHOTO = 'photo',
}
export const MODALS_CONNECTION = [{
    name: MODAL_NAMES.LANGUAGE,
    component: LanguageModalComponent,
    moduleRef: LanguageModalModule,
  },
  {
    name: MODAL_NAMES.PHOTO,
    component: PhotoModalComponent,
    moduleRef: PhotoModalModule,
  }
]
