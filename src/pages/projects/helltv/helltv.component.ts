import { Component } from '@angular/core';
import {PROJECTS} from "@constants/works/works.const";
import {IPhoto} from "@interfaces/photo.interface";

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
  readonly previewList: IPhoto[] | undefined =
    PROJECTS['HELLTV'].PREVIEWS?.map((src, index) => ({name: 'Preview', src, id: index}))

  readonly sliderItems = [
   [
     '/assets/img/slide1.png',
    '/assets/img/slide2.png',
    '/assets/img/slide3.png',
    '/assets/img/slide4.png'
   ], [
      '/assets/img/slide5.png',
    '/assets/img/slide6.png',
    '/assets/img/slide7.png'
    ]
  ];
}
