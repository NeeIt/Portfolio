import { Component } from '@angular/core';
import {PROJECTS} from "@constants/works/works.const";
import {IPhoto} from "@interfaces/photo.interface";
import {TabIndexService} from "@services/tab-index.service";

@Component({
  selector: 'app-helltv',
  templateUrl: './helltv.component.html',
  styleUrls: ['../project.scss', '../project.media.scss']
})
export class HelltvComponent {
  readonly breadcrumbs: { title: string, url?: string }[] = [
    {title: 'SEO.WORKS.NAVIGATION', url: '/works'},
    {title: 'SEO.WORK_LIST.NAVIGATION', url: '/works/list'},
    {title: 'SEO.PROJECT.HELLTV.NAVIGATION', },
  ];

  readonly project = PROJECTS['HELLTV']
  readonly previewList: IPhoto[] =
    PROJECTS['HELLTV'].PREVIEWS?.map((src, index) => ({name: 'Preview', src, id: index})) || []

  readonly sliderItems: string[][] = [
    PROJECTS['HELLTV']?.PREVIEWS?.length ?
      PROJECTS['HELLTV'].PREVIEWS.slice(0, Math.ceil(PROJECTS['HELLTV'].PREVIEWS.length / 2)) : [],
    PROJECTS['HELLTV']?.PREVIEWS?.length && PROJECTS['HELLTV']?.PREVIEWS?.length > 1 ?
      PROJECTS['HELLTV'].PREVIEWS.slice(Math.ceil(this.previewList.length / 2), PROJECTS['HELLTV'].PREVIEWS.length): []
  ];

  readonly tabIndexes$ = this.tabIndexService.tabIndexValues$;

  constructor(private readonly tabIndexService: TabIndexService) {}
}
