// TODO: not here
import {LanguageModalComponent} from "@modals/language-modal/language-modal.component";
import {LanguageModalModule} from "@modals/language-modal/language-modal.module";
import {PhotoModalComponent} from "@modals/photo-modal/photo-modal.component";
import {PhotoModalModule} from "@modals/photo-modal/photo-modal.module";
import {TestComponent} from "@modals/test/test.component";
import {TestModalModule} from "@modals/test/test.module";

export interface IModal {
  name: MODAL_NAMES;
  componentRef: any;
  index: number;
}
export enum MODAL_NAMES {
  LANGUAGE = 'language',
  PHOTO = 'photo',
  TEST = 'test-modal'
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
  },
  {
    name: MODAL_NAMES.TEST,
    component: TestComponent,
    moduleRef: TestModalModule,
  }
]
