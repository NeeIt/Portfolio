import {ICompany, IProject} from "@interfaces/works.interface";

export const COMPANIES: {[key: string]: ICompany} = {
  GMCS: {
    NAME: 'COMPANIES.GMCS.NAME',
    DESCRIPTION: 'COMPANIES.GMCS.DESCRIPTION',
    RESPONSIBILITIES: "COMPANIES.GMCS.RESPONSIBILITIES",
    LINK: 'https://www.gmcs.ru/',
    EMAIL: 'info@gmcs.ru',
    PHONE: '+7(495)737-99-91',
    ADDRESS: 'Russia, 119602, Moscow, Pokryshkina street 7',
    ROLE: "COMPANIES.GMCS.ROLE",
  },
  SCLOUD: {
    NAME: 'COMPANIES.SCLOUD.NAME',
    DESCRIPTION: 'COMPANIES.SCLOUD.DESCRIPTION',
    RESPONSIBILITIES: "COMPANIES.SCLOUD.RESPONSIBILITIES",
    LINK: 'https://scloud.ru',
    ADDRESS: 'Russia, Tula region, Tula, Boldina street 98',
    EMAIL: 'help@scloud.ru',
    PHONE: ['+7(800)301-78-58', '+7(495)786-59-15', '+7(499)704-21-57', '+7(499)753-33-34'],
    ROLE: "COMPANIES.SCLOUD.ROLE",
  },
  ITFORCE: {
    NAME: 'COMPANIES.ITFORCE.NAME',
    DESCRIPTION: 'COMPANIES.ITFORCE.DESCRIPTION',
    RESPONSIBILITIES: "COMPANIES.ITFORCE.RESPONSIBILITIES",
    LINK: 'https://itforce.io',
    PHONE: '+35795905953',
    EMAIL: 'contact@itforce.io',
    ADDRESS: 'Gamevio Ltd. HE 404862. Loutrakiou 5, Chara Benezia Bld, 1st floor, Office 101, Strovolos, 2027, Nicosia, Cyprus',
    ROLE: "COMPANIES.ITFORCE.ROLE",
  }
}

export const PROJECTS: Record<string, IProject> = {
  PORTFOLIO: {
    KEY: 'PORTFOLIO',
    NAME: "PROJECTS.PORTFOLIO.NAME",
    AWARDS: 'PROJECTS.PORTFOLIO.AWARDS',
    DESCRIPTION: "PROJECTS.PORTFOLIO.DESCRIPTION",
    DESCRIPTION_SHORT: "PROJECTS.PORTFOLIO.DESCRIPTION_SHORT",
    FEATURED: "PROJECTS.PORTFOLIO.FEATURED",
    CREATED: "2023-10-01",
    KEYWORDS: ["Angular", "SSR", "HTML5"],
    IMAGE: '/assets/img/projects/image.jpg',
    LOGO: '/assets/img/projects/logo_dark.png',
    ROLE: "PROJECTS.PORTFOLIO.ROLE",
    URL: "vladislavushmankin.com",
    WORK_DATE_FROM: "2023-10-01T00:00:00",
    GITHUB: "link",
    WORK_DATE_TO: null,
    STACK: ['Angular', 'Typescript', 'Sentry', 'Figma', 'NestJS', 'SSR'],
    SKILLS: [
      {
        title: 'SKILLS.SSR.TITLE',
        description: 'SKILLS.SSR.DESCRIPTION',
        isMain: true
      },
      {
        title: 'SKILLS.ANGULAR.TITLE',
        description: 'SKILLS.ANGULAR.DESCRIPTION',
        isMain: true
      },
      {
        title: 'SKILLS.SEO.TITLE',
        description: 'SKILLS.SEO.DESCRIPTION',
        isMain: true
      },
      {
        title: 'SKILLS.TYPESCRIPT.TITLE',
        description: 'SKILLS.TYPESCRIPT.DESCRIPTION',
        isMain: false
      },
      {
        title: 'SKILLS.FIGMA.TITLE',
        description: 'SKILLS.FIGMA.DESCRIPTION',
        isMain: false
      },
    ],
  },
  CSGOFAST: {
    KEY: 'CSGOFAST',
    NAME: "PROJECTS.CSGOFAST.NAME",
    AWARDS: 'PROJECTS.CSGOFAST.AWARDS',
    DESCRIPTION: "PROJECTS.CSGOFAST.DESCRIPTION",
    DESCRIPTION_SHORT: "PROJECTS.CSGOFAST.DESCRIPTION_SHORT",
    FEATURED: "PROJECTS.CSGOFAST.FEATURED",
    ROLE: "PROJECTS.CSGOFAST.ROLE",
    CREATED: "2020-01-01",
    KEYWORDS: ["Angular", "SSR", "HTML5"],
    IMAGE: '/assets/img/projects/csgofast.jpg',
    LOGO: '/assets/img/projects/csgofast-logo.jpg',
    PREVIEWS: ['assets/img/previews/fast.png', 'assets/img/previews/fast2.png', 'assets/img/previews/fast3.png', 'assets/img/previews/fast4.png', 'assets/img/previews/fast5.png', 'assets/img/previews/fast6.png', 'assets/img/previews/fast7.png', 'assets/img/previews/fast8.png'],
    URL: "https://csgofast.com",
    WORK_DATE_FROM: "2023-05-01T00:00:00",
    WORK_DATE_TO: null,
    COMPANY: COMPANIES['ITFORCE'],
    STACK: ['Angular', 'Typescript', 'Sentry', 'Figma', 'NestJs', 'SSR'],
    SKILLS: [
      {
        title: 'SKILLS.SSR.TITLE',
        description: 'SKILLS.SSR.DESCRIPTION',
        isMain: true
      },
      {
        title: 'SKILLS.DOCUMENTATION.TITLE',
        description: 'SKILLS.DOCUMENTATION.DESCRIPTION',
        isMain: true
      },
      {
        title: 'SKILLS.ANGULAR.TITLE',
        description: 'SKILLS.ANGULAR.DESCRIPTION',
        isMain: true
      },
      {
        title: 'SKILLS.SEO.TITLE',
        description: 'SKILLS.SEO.DESCRIPTION',
        isMain: true
      },
      {
        title: 'SKILLS.TYPESCRIPT.TITLE',
        description: 'SKILLS.TYPESCRIPT.DESCRIPTION',
        isMain: false
      },
      {
        title: 'SKILLS.FIGMA.TITLE',
        description: 'SKILLS.FIGMA.DESCRIPTION',
        isMain: false
      },
    ],
  },
  HELLTV: {
    KEY: 'HELLTV',
    NAME: "PROJECTS.HELLTV.NAME",
    AWARDS: 'PROJECTS.HELLTV.AWARDS',
    DESCRIPTION: "PROJECTS.HELLTV.DESCRIPTION",
    DESCRIPTION_SHORT: "PROJECTS.HELLTV.DESCRIPTION_SHORT",
    ROLE: "PROJECTS.HELLTV.ROLE",
    FEATURED: "PROJECTS.HELLTV.FEATURED",
    CREATED: "2020-01-01",
    KEYWORDS: ["Angular", "SSR", "HTML5"],
    IMAGE: '/assets/img/projects/helltv.png',
    LOGO: '/assets/img/projects/helltv-logo.png',
    PREVIEWS: ['assets/img/previews/helltv.png', 'assets/img/previews/helltv2.png', 'assets/img/previews/helltv3.png', 'assets/img/previews/helltv4.png', 'assets/img/previews/helltv5.png', 'assets/img/previews/helltv6.png', 'assets/img/previews/helltv7.png', 'assets/img/previews/helltv8.png', 'assets/img/previews/helltv9.png'],
    URL: "https://helltv.store",
    WORK_DATE_FROM: "2022-04-01T00:00:00",
    WORK_DATE_TO: null,
    COMPANY: COMPANIES['ITFORCE'],
    STACK: ['Angular', 'Typescript', 'Sentry', 'Figma', 'SSR'],
    SKILLS: [
      {
        title: 'SKILLS.LEAD.TITLE', // Предполагается, что 'Lead' также будет определено в вашем словаре локализации
        description: 'SKILLS.LEAD.DESCRIPTION', // Аналогично для описания
        isMain: true
      },
      {
        title: 'SKILLS.ANGULAR.TITLE',
        description: 'SKILLS.ANGULAR.DESCRIPTION',
        isMain: true
      },
      {
        title: 'SKILLS.SSR.TITLE',
        description: 'SKILLS.SSR.DESCRIPTION',
        isMain: true
      },
      {
        title: 'SKILLS.DOCUMENTATION.TITLE',
        description: 'SKILLS.DOCUMENTATION.DESCRIPTION',
        isMain: true
      },
      {
        title: 'SKILLS.SEO.TITLE',
        description: 'SKILLS.SEO.DESCRIPTION',
        isMain: true
      },
      {
        title: 'SKILLS.ANIMATIONS.TITLE',
        description: 'SKILLS.ANIMATIONS.DESCRIPTION',
        isMain: false
      },
    ],
  },
  SCLOUD: {
    KEY: 'SCLOUD',
    NAME: "PROJECTS.SCLOUD.NAME",
    AWARDS: 'PROJECTS.SCLOUD.AWARDS',
    ROLE: "PROJECTS.SCLOUD.ROLE",
    DESCRIPTION: "PROJECTS.SCLOUD.DESCRIPTION",
    DESCRIPTION_SHORT: "PROJECTS.SCLOUD.DESCRIPTION_SHORT",
    FEATURED: "PROJECTS.SCLOUD.FEATURED",
    CREATED: "2020-01-01",
    KEYWORDS: ["Angular", "SSR", "HTML5"],
    IMAGE: '/assets/img/projects/scloud.png',
    LOGO: '/assets/img/projects/scloud-logo.png',
    PREVIEWS: ['assets/img/previews/scloud.png', 'assets/img/previews/scloud2.png', 'assets/img/previews/scloud3.png'],
    URL: "https://scloud.ru",
    WORK_DATE_FROM: "2020-09-01T00:00:00",
    WORK_DATE_TO: "2022-04-01T00:00:00",
    COMPANY: COMPANIES['SCLOUD'],
    STACK: ['Angular', 'Typescript', 'Sentry', 'Figma'],
    SKILLS: [
      {
        title: 'SKILLS.ANGULAR.TITLE',
        description: 'SKILLS.ANGULAR.DESCRIPTION',
        isMain: true
      },
      {
        title: 'SKILLS.TYPESCRIPT.TITLE',
        description: 'SKILLS.TYPESCRIPT.DESCRIPTION',
        isMain: true
      },
      {
        title: 'SKILLS.UNIT_TESTS.TITLE',
        description: 'SKILLS.UNIT_TESTS.DESCRIPTION',
        isMain: true
      },
      {
        title: 'SKILLS.DOCUMENTATION.TITLE',
        description: 'SKILLS.DOCUMENTATION.DESCRIPTION',
        isMain: true
      },
      {
        title: 'SKILLS.ADAPTIVE.TITLE',
        description: 'SKILLS.ADAPTIVE.DESCRIPTION',
        isMain: false
      },
    ],
  },
  KFC: {
    KEY: 'KFC',
    NAME: "PROJECTS.KFC.NAME",
    DESCRIPTION: "PROJECTS.KFC.DESCRIPTION",
    DESCRIPTION_SHORT: "PROJECTS.KFC.DESCRIPTION_SHORT",
    CREATED: "2020-01-01",
    KEYWORDS: ["Angular", "SSR", "HTML5"],
    IMAGE: '/assets/img/projects/kfc.png',
    LOGO: '/assets/img/projects/kfc-logo.png',
    FEATURED: "PROJECTS.KFC.FEATURED",
    ROLE: "PROJECTS.KFC.ROLE",
    URL: 'https://teamkfc.yum.com',
    WORK_DATE_FROM: "2019-08-01T00:00:00",
    WORK_DATE_TO: "2020-08-01T00:00:00",
    COMPANY: COMPANIES['KFC'],
    STACK: ['Angular', 'Typescript'],
    PREVIEWS: ['assets/img/previews/kfc.png'],
    SKILLS: [
      {
        title: 'SKILLS.ANGULAR.TITLE',
        description: 'SKILLS.ANGULAR.DESCRIPTION',
        isMain: true
      },
      {
        title: 'SKILLS.TYPESCRIPT.TITLE',
        description: 'SKILLS.TYPESCRIPT.DESCRIPTION',
        isMain: true
      },
      {
        title: 'SKILLS.GIT.TITLE',
        description: 'SKILLS.GIT.DESCRIPTION',
        isMain: true
      },
      {
        title: 'SKILLS.HTML5.TITLE',
        description: 'SKILLS.HTML5.DESCRIPTION',
        isMain: false
      },
      {
        title: 'SKILLS.SCSS.TITLE',
        description: 'SKILLS.SCSS.DESCRIPTION',
        isMain: false
      },
    ],
  },
}
