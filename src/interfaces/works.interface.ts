import {COMPANIES} from "@constants/works/works.const";

export interface ICompany {
  NAME: string;
  DESCRIPTION: string;
  LINK: string;
  ADDRESS: string;
  PHONE: string | string[];
  EMAIL: string;
  ROLE: string;
  RESPONSIBILITIES: string;
}

export interface ISkill {
  title: string;
  description?: string;
  isMain: boolean;
}

export interface IProject {
  KEY: string;
  NAME: string;
  AWARDS?: string;
  DESCRIPTION: string;
  DESCRIPTION_SHORT: string;
  CREATED: string;
  KEYWORDS: string[];
  IMAGE: string;
  PREVIEWS?: string[];
  LOGO: string;
  FEATURED: string;
  EXAMPLE?: string;
  ROLE: string;
  URL: string;
  WORK_DATE_FROM: string;
  WORK_DATE_TO: string | null;
  COMPANY?: ICompany;
  SKILLS: ISkill[];
  STACK: string[];
  GITHUB?: string;
}
