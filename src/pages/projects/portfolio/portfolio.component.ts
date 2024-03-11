import { Component } from '@angular/core';
import {PROJECTS} from "@constants/works/works.const";
import {AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE} from "@constants/base/language.const";
import {SchemaService} from "@services/schema.service";
import {Observable} from "rxjs";
import {MyTranslateService} from "@services/translate.service";
import { environment } from "@environments/environment";
import {IPhoto} from "@interfaces/photo.interface";
import {TabIndexService} from "@services/tab-index.service";

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
      src:'/assets/img/projects/portfolio/portfolio-figma.jpg'
    },
    theme: {
      id: 1,
      name: 'Light color theme',
      src:'/assets/img/projects/portfolio/portfolio-themes.png'
    },
    ai: {
      id: 2,
      name: 'Midjourney',
      src: '/assets/img/projects/portfolio/portfolio-midjourney.jpg',
      description: 'One of my midjourney request\'s results'
    },
    postman: {
      id: 3,
      name: 'SSR',
      src: '/assets/img/projects/portfolio/portfolio-postman.png',
      description: 'Result for postman\' resuest'
    },
    langs: {
      id: 4,
      name: 'Language change modal',
      description: 'I\'m going to add more languages for this site',
      src: '/assets/img/projects/portfolio/portfolio-preview-1.png'
    },
    mobile: {
      id: 5,
      name: 'Mobile adaptation of this site',
      src: '/assets/img/projects/portfolio/portfolio-mockup.png',
    },
    accessibility: {
      id: 6,
      name: 'Accessibility',
      src: '/assets/img/projects/portfolio/portfolio-accessibility.jpg'
    },
    sentry: {
      id: 7,
      name: 'Sentry',
      src: '/assets/img/projects/portfolio/portfolio-sentry.png',
    },
    gtm: {
      id: 8,
      name: 'Google Tag Manager',
      src: '/assets/img/projects/portfolio/portfolio-gtm.png',
    },
    404 : {
      id: 9,
      name: '404 page',
      src: '/assets/img/projects/portfolio/portfolio-preview-2.png',
      description: 'this page also has parallax animation on desktop'
    }
  };

  sliderItems = [
    [

    ], [

    ]
  ];

  readonly tabIndexes$ = this.tabIndexService.tabIndexValues$;

  constructor(
    private readonly schemaService: SchemaService,
    private readonly mTranslateService: MyTranslateService,
    private readonly tabIndexService: TabIndexService
  ) {}

  ngOnInit(): void {
    this.mTranslateService.currentLang$.pipe().subscribe((lang) => {
      setTimeout(() => this.indexSchema$ = this.schemaService.getSchema('INDEX'), 350);
    })
    this.indexSchema$ = this.schemaService.getSchema('INDEX');
  }

}
