import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input} from '@angular/core';
import {titleAnimation} from "@components/layout/title/title.animations";
import {RoutingService} from "@services/routing.service";
import {skip, Subscription} from "rxjs";
import {LINKS, PAGE_TYPE} from "@constants/base/routes.const";
import {LightModeService} from "@services/light-mode.service";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss', './title.component.media.scss'],
  animations: [titleAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleComponent {
  private readonly subscriptions = new Subscription();
  page: string | null = null;
  textTransformPosition = '100%';

  readonly links = LINKS.filter(link => link.data.pageType === PAGE_TYPE.MAIN);
  readonly currentMode$ = this.lightModeService.currentMode$;

  @Input() animationState = '/';

  constructor(
    private readonly routingService: RoutingService,
    private readonly lightModeService: LightModeService,
    private readonly cdr: ChangeDetectorRef,
    @Inject('isServer') private isServer: boolean,
  ) {
  }


  ngOnInit(): void {
    if(!this.isServer) {
      this.textTransformPosition = '0%';
      this.cdr.markForCheck();
    }

    this.subscriptions.add(this.routingService.currentLinkData$
      .pipe(skip(1))
      .subscribe(data => {
        if(data.index !== -1) {
          this.page = '/'+LINKS.filter(link => link.data.pageType === PAGE_TYPE.MAIN)[data.index].path;
        } else {
          if(data.data.pageType === PAGE_TYPE.NOT_FOUNT) {
            this.page = '/404';
          } else {
            this.page = null;
          }
        }
        this.cdr.markForCheck();
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
