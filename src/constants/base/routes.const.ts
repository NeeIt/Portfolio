export enum PAGE_TYPE {
  MAIN,
  NOT_FOUNT,
  FULL_PAGE
}

export const LINKS = [
  {
    "path": '',
    loadChildren: () => import('@pages/index/index.module').then(m => m.IndexModule),
    data: {animation: 'Home', seoLocale: 'SEO.HOME', pageType: PAGE_TYPE.MAIN, isSeoPage: true, schemaKey: 'INDEX'}
  },
  {
    "path": 'about',
    loadChildren: () => import('@pages/about/about.module').then(m => m.AboutModule),
    data: {animation: 'About', seoLocale: 'SEO.ABOUT', pageType: PAGE_TYPE.MAIN, isSeoPage: true, schemaKey: 'ABOUT', connected: 'about/details'}
  },
  {
    "path": 'works',
    loadChildren: () => import('@pages/works/works.module').then(m => m.WorksModule),
    data: {animation: 'Works', seoLocale: 'SEO.WORKS', pageType: PAGE_TYPE.MAIN, isSeoPage: true, schemaKey: 'WORKS', connected: 'works/list'}
  },
  {
    "path": 'contact',
    loadChildren: () => import('@pages/contact/contact.module').then(m => m.ContactModule),
    data: {animation: 'Contact', seoLocale: 'SEO.CONTACT', pageType: PAGE_TYPE.MAIN, isSeoPage: true, schemaKey: 'CONTACTS'}
  },
  {
    "path": 'works/list',
    loadChildren: () => import('@pages/work-list/work-list.module').then(m => m.WorkListModule),
    data: {animation: 'FullPage', seoLocale: 'SEO.WORK_LIST', pageType: PAGE_TYPE.FULL_PAGE, isSeoPage: true, schemaKey: 'PROJECTS'}
  },
  {
    "path": 'about/details',
    loadChildren: () => import('@pages/details/details.module').then(m => m.DetailsModule),
    data: {animation: 'FullPage', seoLocale: 'SEO.DETAILS', pageType: PAGE_TYPE.FULL_PAGE, isSeoPage: true, schemaKey: 'ABOUT'}
  },
  {
    "path": 'works/kfc',
    loadChildren: () => import('@pages/projects/kfc/kfc.module').then(m => m.KfcModule),
    data: {animation: 'FullPageProject', seoLocale: 'SEO.PROJECT.KFC', pageType: PAGE_TYPE.FULL_PAGE, isSeoPage: true, schemaKey: 'PROJECT_KFC'}
  },
  {
    "path": 'works/scloud',
    loadChildren: () => import('@pages/projects/scloud/scloud.module').then(m => m.ScloudModule),
    data: {animation: 'FullPageProject', seoLocale: 'SEO.PROJECT.SCLOUD', pageType: PAGE_TYPE.FULL_PAGE, isSeoPage: true, schemaKey: 'PROJECT_SCLOUD'}
  },
  {
    "path": 'works/helltv',
    loadChildren: () => import('@pages/projects/helltv/helltv.module').then(m => m.HelltvModule),
    data: {animation: 'FullPageProject', seoLocale: 'SEO.PROJECT.HELLTV', pageType: PAGE_TYPE.FULL_PAGE, isSeoPage: true, schemaKey: 'PROJECT_HELLTV'}
  },
  {
    "path": 'works/csgofast',
    loadChildren: () => import('@pages/projects/csgofast/csgofast.module').then(m => m.CsgofastModule),
    data: {animation: 'FullPageProject', seoLocale: 'SEO.PROJECT.CSGOFAST', pageType: PAGE_TYPE.FULL_PAGE, isSeoPage: true, schemaKey: 'PROJECT_CSGOFAST'}
  },
  {
    "path": 'works/portfolio',
    loadChildren: () => import('@pages/projects/portfolio/portfolio.module').then(m => m.PortfolioModule),
    data: {animation: 'FullPageProject', seoLocale: 'SEO.PROJECT.PORTFOLIO', pageType: PAGE_TYPE.FULL_PAGE, isSeoPage: true, schemaKey: 'PROJECT_PORTFOLIO'}
  }
];

export const NOT_FOUND_PAGE = {
    "path": '**',
    loadChildren: () => import('@pages/not-found/not-found.module').then(m => m.NotFoundModule),
    data: {animation: 'NotFound', seoLocale: 'SEO.404', pageType: PAGE_TYPE.NOT_FOUNT, isSeoPage: true, schemaKey: '404'}
  }
