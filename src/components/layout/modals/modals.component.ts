import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ModalService} from "@services/modals.service";

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalsComponent  implements AfterViewInit{
  @ViewChild('modals', {read: ViewContainerRef}) modals!: ViewContainerRef;

  modals$ = this.modalService.modals$;

  constructor(
    private readonly modalService: ModalService,
  ) {
  }

  @HostListener('document:click', ['$event'])
  click($event: any): void {
    const className = $event.target?.className;
    if(className && typeof className === 'string' && className.includes('modals_active')) {
      this.modalService.closeLatestModal();
    }
  }

  ngAfterViewInit(): void {
    this.modalService.registerModals(this.modals)
  }
}
