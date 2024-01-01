import {COMPANIES, PROJECTS} from "@constants/works/works.const";
import {MY_EMAIL, MY_PHONE, SOCIAL_TYPES} from "@constants/contacts/socials.const";
import {environment} from "@environments/environment";

const NAME = "DATA.NAME";
const PHOTO_URL = "https://"+environment.hostName+"/me.png";
const URL = "https://"+environment.hostName;
const JOB_TITLE = "DATA.JOB_TITLE";
const JOB_TITLE_SHORT = "DATA.JOB_TITLE_SHORT";
const CONTACTS = {
  "@type": "ContactPoint",
  "email": MY_EMAIL,
  "telephone": MY_PHONE,
  "contactType": "customer support",
  "availableLanguage": ["SKILLS.RUSSIAN.TITLE", "SKILLS.ENGLISH.TITLE", "SKILLS.UKRAINIAN.TITLE"]
};
const LOCATION = {
  "@type": "Place",
  "address": "DATA.CURRENT_LOCATION"
};

const AWARDS = "DATA.AWARDS"
const EDUCATION = "DATA.EDUCATION";
const MAIN_SKILLS = "DATA.SKILLS";
const ADDITIONAL_SKILLS = "DATA.ADDITIONAL_SKILLS";
const LANGUAGES = ["SKILLS.RUSSIAN.TITLE", "SKILLS.UKRAINIAN.TITLE", "SKILLS.ENGLISH.TITLE", "SKILLS.JAPANESE.TITLE"];
const SOCIALS = Object.values(SOCIAL_TYPES);
const INTERESTS = "DATA.INTERESTS";


const PROJECTS_SHORT = Object.values(PROJECTS).map(project => ({
  "@type": "CreativeWork",
  "name": project.NAME,
  "description": project.DESCRIPTION_SHORT
}));


const PROJECT_LIST_SHORT = Object.values(PROJECTS).map((project, index) => ({
  "@type": "ListItem",
  "position": index + 1,
  "item": {
    "@type": "CreativeWork",
    "name": project.NAME,
    "about": project.DESCRIPTION_SHORT
  }
}));

const COMPANIES_SHORT = Object.values(COMPANIES).map(company => (  {
  "@type": "Occupation",
  "name": company.ROLE,
  "responsibilities": company.RESPONSIBILITIES
}));

const BASE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": NAME,
  "jobTitle": JOB_TITLE_SHORT,
  "url": URL
}

export const SCHEMA_DATA: {[key: string]: any} = {
  "DEFAULT": {
    ...BASE_SCHEMA,
  },
  "INDEX": {
    ...BASE_SCHEMA,
    "image": PHOTO_URL,
    "workLocation": LOCATION,
    "description": JOB_TITLE,
    "contactPoint": CONTACTS,
    "skills": MAIN_SKILLS,
    "additionalSkills": ADDITIONAL_SKILLS,
    "sameAs": SOCIALS,
    "hasOccupation": COMPANIES_SHORT,
    "hasWorkedOn": PROJECTS_SHORT,
    "award": AWARDS,
    "hasOccupationalCredential": [{
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": JOB_TITLE,
      "competencyRequired": MAIN_SKILLS
    }],
  },
  "CONTACTS": {
    ...BASE_SCHEMA,
    "image": PHOTO_URL,
    "workLocation": LOCATION,
    "description": JOB_TITLE,
    "contactPoint": CONTACTS,
    "skills": MAIN_SKILLS,
    "additionalSkills": ADDITIONAL_SKILLS,
    "sameAs": SOCIALS,
    "hasOccupation": COMPANIES_SHORT,
    "hasWorkedOn": PROJECTS_SHORT,
    "award": AWARDS,
    "hasOccupationalCredential": [{
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": JOB_TITLE,
      "competencyRequired": MAIN_SKILLS
    }],
    "contactType": "business inquiries",
  },
  "ABOUT": {
    ...BASE_SCHEMA,
    "image": PHOTO_URL,
    "workLocation": LOCATION,
    "description": JOB_TITLE,
    "contactPoint": CONTACTS,
    "skills": MAIN_SKILLS,
    "additionalSkills": ADDITIONAL_SKILLS,
    "sameAs": SOCIALS,
    "hasOccupation": COMPANIES_SHORT,
    "hasWorkedOn": PROJECTS_SHORT,
    "award": AWARDS,
    "hasOccupationalCredential": [{
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": JOB_TITLE,
      "competencyRequired": MAIN_SKILLS
    }],
    "interests": INTERESTS,
    "knowsLanguage": LANGUAGES,
    "alumniOf": EDUCATION,
  },
  "WORKS": {
    ...BASE_SCHEMA,
    "knowsLanguage": LANGUAGES,
    "hasOccupation": COMPANIES_SHORT,
    "hasWorkedOn": PROJECTS_SHORT,
    "skills": MAIN_SKILLS,
    "award": AWARDS,
    "additionalSkills": ADDITIONAL_SKILLS,
    "itemListElement": PROJECT_LIST_SHORT,
    "hasOccupationalCredential": [{
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": JOB_TITLE,
      "competencyRequired": MAIN_SKILLS
    }],
  },
  "PROJECTS": {
    ...BASE_SCHEMA,
    "knowsLanguage": LANGUAGES,
    "hasOccupation": COMPANIES_SHORT,
    "hasWorkedOn": PROJECTS_SHORT,
    "skills": MAIN_SKILLS,
    "award": AWARDS,
    "additionalSkills": ADDITIONAL_SKILLS,
    "itemListElement": PROJECT_LIST_SHORT,
    "hasOccupationalCredential": [{
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": JOB_TITLE,
      "competencyRequired": MAIN_SKILLS
    }],
  },
}

Object.values(PROJECTS).map(project => (
  SCHEMA_DATA['PROJECT_'+project.KEY] = {
    ...BASE_SCHEMA,
    "name": project.NAME,
    "about": project.DESCRIPTION,
    "dateCreated": project.CREATED,
    "keywords": project.KEYWORDS,
    "image": project.IMAGE,
    "workFeatured": project.FEATURED,
    "workExample": project.EXAMPLE,
    "roleDescription": project.ROLE,
    "url": project.URL,
    "skills": MAIN_SKILLS,
    "creator": {
      "@type": "Organization",
      "name": project.COMPANY?.NAME
    },
    "publisher": {
      "@type": "Organization",
      "name": project.COMPANY?.NAME
    },
  }));

