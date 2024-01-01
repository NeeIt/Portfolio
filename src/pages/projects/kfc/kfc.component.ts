import { Component } from '@angular/core';
import {PROJECTS} from "@constants/works/works.const";
import {IPhoto} from "@interfaces/photo.interface";

@Component({
  selector: 'app-kfc',
  templateUrl: './kfc.component.html',
  styleUrls: ['../project.scss', '../project.media.scss']
})
export class KfcComponent {
  readonly breadcrumbs: { title: string, url?: string }[] = [
    {title: 'SEO.WORKS.NAVIGATION', url: '/works'},
    {title: 'SEO.WORK_LIST.NAVIGATION', url: '/works/list'},
    {title: 'SEO.PROJECT.KFC.NAVIGATION', },
  ];

  readonly project = PROJECTS['KFC']
  readonly previewList: IPhoto[] | undefined =
    PROJECTS['KFC'].PREVIEWS?.map((src, index) => ({name: 'Preview', src, id: index}))
}
