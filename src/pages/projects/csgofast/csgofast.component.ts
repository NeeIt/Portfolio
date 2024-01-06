import { Component } from '@angular/core';
import {PROJECTS} from "@constants/works/works.const";
import {IPhoto} from "@interfaces/photo.interface";
import {TabIndexService} from "@services/tab-index.service";

@Component({
  selector: 'app-csgofast',
  templateUrl: './csgofast.component.html',
  styleUrls: ['../project.scss', '../project.media.scss']
})
export class CsgofastComponent {
  readonly breadcrumbs: { title: string, url?: string }[] = [
    {title: 'SEO.WORKS.NAVIGATION', url: '/works'},
    {title: 'SEO.WORK_LIST.NAVIGATION', url: '/works/list'},
    {title: 'SEO.PROJECT.CSGOFAST.NAVIGATION', },
  ];

  readonly project = PROJECTS['CSGOFAST']
  readonly previewList: IPhoto[] =
    PROJECTS['CSGOFAST'].PREVIEWS?.map((src, index) => ({name: 'Preview', src, id: index})) || []

  readonly sliderItems: string[][] = [
    PROJECTS['CSGOFAST']?.PREVIEWS?.length ?
      PROJECTS['CSGOFAST'].PREVIEWS.slice(0, Math.ceil(this.previewList.length / 2)) : [],
    PROJECTS['CSGOFAST']?.PREVIEWS?.length && PROJECTS['CSGOFAST']?.PREVIEWS?.length > 1 ?
      PROJECTS['CSGOFAST'].PREVIEWS.slice(Math.ceil(this.previewList.length / 2), PROJECTS['CSGOFAST'].PREVIEWS.length): []
  ];

  readonly tabIndexes$ = this.tabIndexService.tabIndexValues$;

  constructor(private readonly tabIndexService: TabIndexService) {}
}
