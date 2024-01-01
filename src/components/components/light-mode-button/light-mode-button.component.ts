import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {LightModeService} from "@services/light-mode.service";
import {TabIndexService} from "@services/tab-index.service";

@Component({
  selector: 'app-light-mode-button',
  templateUrl: './light-mode-button.component.html',
  styleUrls: ['./light-mode-button.component.scss', './light-mode-button.component.media.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LightModeButtonComponent {
  @Input() showText = false;

  readonly currentMode$ = this.lightModeService.currentMode$;
  readonly tabIndexes$ = this.tabIndexService.tabIndexValues$;

  constructor(
    private readonly lightModeService: LightModeService,
    private readonly tabIndexService: TabIndexService
  ) {}

  changeLightMode(): void {
    this.lightModeService.changeLightMode();
  }
}
