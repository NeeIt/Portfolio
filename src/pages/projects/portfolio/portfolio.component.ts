import { Component } from '@angular/core';
import {PROJECTS} from "@constants/works/works.const";
import {AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE} from "@constants/base/language.const";
import {SchemaService} from "@services/schema.service";
import {Observable} from "rxjs";
import {MyTranslateService} from "@services/translate.service";
import { environment } from "@environments/environment";
import {IPhoto} from "@interfaces/photo.interface";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['../project.scss', '../project.media.scss', './portfolio.component.scss']
})
export class PortfolioComponent {
  indexSchema$!: Observable<any>;
  readonly currentLang$ = this.mTranslateService.currentLang$;

  readonly defaultLang = DEFAULT_LANGUAGE;
  readonly breadcrumbs: { title: string, url?: string }[] = [
    {title: 'SEO.WORKS.NAVIGATION', url: '/works'},
    {title: 'SEO.WORK_LIST.NAVIGATION', url: '/works/list'},
    {title: 'SEO.PROJECT.PORTFOLIO.NAVIGATION', },
  ];
  readonly project = PROJECTS['PORTFOLIO'];
  readonly langs = AVAILABLE_LANGUAGES;
  readonly environment = environment;
  readonly photoItems: Record<string, IPhoto> = {
    figma: {
      id: 0,
      name: 'Figma file',
      description: 'an example of my references I used to make my own design',
      src:'/assets/img/figma.jpg'
    },
    theme: {
      id: 1,
      name: 'Light color theme',
      src:'/assets/img/themes.png'
    },
    ai: {
      id: 2,
      name: 'Modjourney',
      src: '/assets/img/midjourney.jpg',
      description: 'One of my midjourney request\'s results'
    },
    postman: {
      id: 3,
      name: 'SSR',
      src: '/assets/img/postman.png',
      description: 'Result for postman\' resuest'
    },
    langs: {
      id: 4,
      name: 'Language change modal',
      description: 'I\'m going to add more languages for this site',
      src: '/assets/img/langs.png'
    },
    mobile: {
      id: 5,
      name: 'Mobile adaptation of this site',
      src: '/assets/img/mobilep.png',
    },
    accessibility: {
      id: 6,
      name: 'Accessibility',
      src: '/assets/img/accessibility.jpg'
    },
    sentry: {
      id: 7,
      name: 'Sentry',
      src: '/assets/img/sentryp.png',
    },
    gtm: {
      id: 8,
      name: 'Google Tag Manager',
      src: '/assets/img/gtm.png',
    },
    404 : {
      id: 9,
      name: '404 page',
      src: '/assets/img/404.png',
      description: 'this page also has parallax animation on desktop'
    }
  };

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

  constructor(
    private readonly schemaService: SchemaService,
    private readonly mTranslateService: MyTranslateService
  ) {}

  ngOnInit(): void {
    this.mTranslateService.currentLang$.pipe().subscribe((lang) => {
      setTimeout(() => this.indexSchema$ = this.schemaService.getSchema('INDEX'), 350);
    })
    this.indexSchema$ = this.schemaService.getSchema('INDEX');
  }

}
