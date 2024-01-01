import {Component, Input} from '@angular/core';
import {IPhoto} from "@interfaces/photo.interface";
import {ModalService} from "@services/modals.service";
import {MODAL_NAMES} from "@interfaces/modals.interface";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {
  @Input() photoItem: IPhoto = {id: 0, name: 'Undefined', src: 'defaultSrc'}
  @Input() photoSet!: IPhoto[];

  constructor(private readonly modalService: ModalService) {
  }

  openPhotoModal(): void {
    this.modalService.openModal(MODAL_NAMES.PHOTO, {photoItem: this.photoItem, photoSet: this.photoSet});
  }
}
