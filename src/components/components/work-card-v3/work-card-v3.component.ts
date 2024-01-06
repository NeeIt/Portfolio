import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {IProject} from "@interfaces/works.interface";
import {IPhoto} from "@interfaces/photo.interface";
import {DEFAULT_LANGUAGE} from "@constants/base/language.const";
import {MyTranslateService} from "@services/translate.service";
import { TabIndexService } from '@services/tab-index.service';

@Component({
  selector: 'app-work-card-v3',
  templateUrl: './work-card-v3.component.html',
  styleUrls: ['./work-card-v3.component.scss', './work-card-v3.component.media.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkCardV3Component implements OnChanges {
  @Input() work!: IProject;
  @Input() reverse = false;

  readonly defaultLang = DEFAULT_LANGUAGE;
  readonly currentLang$ = this.translateService.currentLang$;
  readonly tabIndexes$ = this.tabIndexService.tabIndexValues$;

  currentImage = 0;
  imageList: IPhoto[] = [];

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly translateService: MyTranslateService,
    private readonly tabIndexService: TabIndexService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const workItem: IProject = changes['work']?.currentValue;
    if(workItem) {
      this.imageList = [{name: 'Preview', src: workItem.IMAGE, id: 0}];
      const previews = workItem.PREVIEWS;
      if(previews?.length) {
        previews.forEach((image: string, index) => {
          this.imageList.push({name: 'Preview', src: image, id: index + 1})
        })
      }
    }
  }
}
