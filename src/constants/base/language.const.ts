import {getCountryDataList} from "countries-list";

export const AVAILABLE_LANGUAGES = ['RU', 'EN', 'JA', 'UK'];

export const AVAILABLE_COUNTRIES = ['RU', 'US', 'JP', 'UA'];

export const COUNTRIES_LIST = getCountryDataList().filter(country => {
  return AVAILABLE_COUNTRIES.includes(country.iso2?.toUpperCase())
});

export const DEFAULT_LANGUAGE: string = 'EN';
