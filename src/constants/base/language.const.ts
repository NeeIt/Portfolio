import {getCountryDataList} from "countries-list";

export const AVAILABLE_LANGUAGES = ['RU', 'US', 'JP', 'UA'];

export const COUNTRIES_LIST = getCountryDataList().filter(country => AVAILABLE_LANGUAGES.includes(country.iso2));

export const DEFAULT_LANGUAGE = 'US';
