import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from "@constants/base/language.const";
import { LINKS, NOT_FOUND_PAGE, PAGE_TYPE } from "@constants/base/routes.const";

const MAIN_LINKS = LINKS.filter((route, index) => route.data.pageType === PAGE_TYPE.MAIN);
// NOTE: sub router for infinity scroll
const routesWithSub = [
  ...MAIN_LINKS,
  ...MAIN_LINKS
    .filter((route, index) => index === 0 || index === MAIN_LINKS.length - 1)
    .map(route => ({...route, path: route.path+'sub', data: {...route.data, animation: route.data.animation+'Sub', isSeoPage: false}})),
  ...LINKS.filter(route => route.data.pageType !== PAGE_TYPE.MAIN),
]

const routes: Routes = [
  {path: 'home', redirectTo: ''},

  ...getLanguagePaths(DEFAULT_LANGUAGE),

  // different languages
  ...AVAILABLE_LANGUAGES.filter(lang => lang !== DEFAULT_LANGUAGE).map(lang => ({
    path: lang.toLowerCase(),
    data: {lang},
    children: [
      ...getLanguagePaths(lang),
      {
        ...NOT_FOUND_PAGE,
        data: {...NOT_FOUND_PAGE.data, lang}
      }
    ],
  })),
  {
    ...NOT_FOUND_PAGE,
    data: {...NOT_FOUND_PAGE.data, lang: DEFAULT_LANGUAGE}
  }
];

function getLanguagePaths(language: string): any[] {
  return routesWithSub.map(route => ({
    ...route,
    data: {...route.data, lang: language}
  }))
}

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'disabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
