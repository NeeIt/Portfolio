import {ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IModal, MODAL_NAMES, MODALS_CONNECTION} from "@interfaces/modals.interface";
import {TabIndexService} from "@services/tab-index.service";
import {TAB_INDEX_MODE} from "@constants/base/tab-indexes.const";
import {UtilsService} from "@services/utils.service";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  container!: ViewContainerRef;

  private modals = new BehaviorSubject<IModal[]>([]);
  modals$ = this.modals.asObservable();

  constructor(
    private readonly tabIndexService: TabIndexService,
    private readonly utilService: UtilsService,
  ) {
  }

  openModal(name: MODAL_NAMES, payloads?: any): false | IModal {
    const modalConnection = MODALS_CONNECTION.find(modal => modal.name === name);
    if (!modalConnection) return false;
    const currentModals = this.modals.getValue();

    const componentRef = this.createComponent(modalConnection.component, modalConnection.moduleRef);
    if (payloads && componentRef.instance) {
      for (let key in payloads) {
        if (payloads.hasOwnProperty(key)) {
          componentRef.instance[key] = payloads[key];
        }
      }
    }

    const modal = {name, componentRef: componentRef, index: currentModals.length};
    currentModals.push(modal);

    this.tabIndexService.setTabIndexMode(TAB_INDEX_MODE.MODAL);
    this.modals.next(currentModals);
    return modal;
  }

  closeModal(name: MODAL_NAMES): boolean {
    const currentModals = this.modals.getValue();
    const modal = currentModals.find(modal => modal.name === name);
    this.tabIndexService.restorePreviousTabIndex();

    if (!modal) return false;

    this.container.remove(modal.index);

    const newModals = currentModals.filter(p => p.name !== name).map((modal: IModal, index: number) => {
      modal.index = index;
      return modal;
    })

    this.modals.next(newModals);
    return true;
  }

  closeLatestModal(): boolean {
    const currentModals = this.modals.getValue();
    if(currentModals.length === 0) return false;
    this.container.remove(currentModals.length - 1);
    currentModals.pop();
    this.modals.next(currentModals);
    return true;
  }

  registerModals(container: ViewContainerRef): void {
    this.container = container;
  }

  createComponent(componentClass: Type<any>, moduleRef: any): ComponentRef<any> {
    return this.container.createComponent(componentClass, {ngModuleRef: moduleRef});
  }
}
