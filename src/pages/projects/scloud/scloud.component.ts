import { Component } from '@angular/core';
import {PROJECTS} from "@constants/works/works.const";
import {IPhoto} from "@interfaces/photo.interface";

@Component({
  selector: 'app-scloud',
  templateUrl: './scloud.component.html',
  styleUrls: ['../project.scss', '../project.media.scss', './scloud.component.scss']
})
export class ScloudComponent {
  readonly breadcrumbs: { title: string, url?: string }[] = [
    {title: 'SEO.WORKS.NAVIGATION', url: '/works'},
    {title: 'SEO.WORK_LIST.NAVIGATION', url: '/works/list'},
    {title: 'SEO.PROJECT.SCLOUD.NAVIGATION', },
  ];

  readonly project = PROJECTS['SCLOUD']
  readonly previewList: IPhoto[] | undefined =
    PROJECTS['SCLOUD'].PREVIEWS?.map((src, index) => ({name: 'Preview', src, id: index}))

  readonly sliderItems = [
    [
      '/assets/img/previews/scloud.png',
      '/assets/img/previews/scloud2.png',
      '/assets/img/previews/scloud3.png',
    ], [
      '/assets/img/previews/scloud.png',
      '/assets/img/previews/scloud2.png',
      '/assets/img/previews/scloud3.png',
    ]
  ];
}
