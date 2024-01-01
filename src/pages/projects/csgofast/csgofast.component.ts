import { Component } from '@angular/core';
import {PROJECTS} from "@constants/works/works.const";
import {IPhoto} from "@interfaces/photo.interface";

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
  readonly previewList: IPhoto[] | undefined =
    PROJECTS['CSGOFAST'].PREVIEWS?.map((src, index) => ({name: 'Preview', src, id: index}))
  sliderItems = [
    [
      '/assets/img/previews/fast.png',
      '/assets/img/previews/fast2.png',
      '/assets/img/previews/fast3.png',
      '/assets/img/previews/fast4.png'
    ], [
      '/assets/img/previews/fast5.png',
      '/assets/img/previews/fast6.png',
      '/assets/img/previews/fast7.png',
      '/assets/img/previews/fast8.png'
    ]
  ];
}
