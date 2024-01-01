import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MODAL_NAMES} from "@interfaces/modals.interface";
import {MyTranslateService} from "@services/translate.service";
import {TabIndexService} from "@services/tab-index.service";
import {ModalService} from "@services/modals.service";
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";
import {IPhoto} from "@interfaces/photo.interface";

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoModalComponent {
  private readonly subscriptions = new Subscription();

  imageLoaded: boolean = false;

  @Input() set photoItem(photoItem: IPhoto) {
    if(photoItem) {
      this._photoItem = photoItem;
      if(!this._photoSet){
        this._photoSet = [photoItem];
      }
    }
  };
  @Input() set photoSet(photoSet: IPhoto[]) {
    if(photoSet) {
      this._photoSet = photoSet;
      this.currentIndex = photoSet.findIndex(item => item.id === this._photoItem.id);
    }
  }

  readonly tabIndexValues$ = this.tabIndexService.tabIndexValues$;

  _photoSet!: IPhoto[]
  _photoItem!: IPhoto;
  currentIndex = 0;

  constructor(
    private translateService: MyTranslateService,
    private tabIndexService: TabIndexService,
    private modalService: ModalService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  close(): void {
    this.modalService.closeModal(MODAL_NAMES.PHOTO);
  }

  nextPhoto(): void {
    this.currentIndex++;
    if(this.currentIndex >= this._photoSet.length) {
      this.currentIndex = this._photoSet.length - 1;
    } else {
      this.imageLoaded = false;
    }
    this.cdr.markForCheck();
  }

  onImageLoad() {
      this.imageLoaded = true;
      this.cdr.markForCheck();
  }

  prevPhoto(): void {
    this.currentIndex--;
    if(this.currentIndex < 0) {
      this.currentIndex = 0;
    } else {
      this.imageLoaded = false;
    }
    this.cdr.markForCheck();
  }
}
