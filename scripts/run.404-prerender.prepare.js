const fs = require('fs');
const path = require('path');

const SCRIPT_CONF = {
  BASE_DIR: 'dist/me/browser',
  MAIN_LANG_PATH: 'src/constants/base/language.const.ts',
  LANG_LIST_PATH: 'src/constants/base/language.const.ts',
  NOT_FOUND_PRERENDER_NAME: 'not-found',
  NOT_FOUND_FILE_NAME: '404',
};

prepare404();

/**
 * Получение дефолтного языка, пути которого не будут иметь кода "/", "games/" (не "pt/games")
 */
function getDefaultLang() {
  console.log('Parsing language.const.ts...');
  try {
    const data = fs.readFileSync(SCRIPT_CONF.MAIN_LANG_PATH, { encoding: 'utf8' });
    let lang = data.match(/DEFAULT_LANGUAGE\s?=\s?["'](.*)["'];/)[1];
    return lang.toLowerCase();
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', "❌ 🚧Can't read " + SCRIPT_CONF.MAIN_LANG_PATH + ". Default lang will be 'en'🚧", err);
    return 'en';
  } finally {
    console.log('-------------------------------');
  }
}

/**
 * Загрузка локалей по которым будут формироваться пререндеры
 */
async function getLanguages() {
  console.log('Parsing language.const.ts...');
  try {
    const data = fs.readFileSync(SCRIPT_CONF.LANG_LIST_PATH, { encoding: 'utf8' });
    const langs = JSON.parse(data.match(/AVAILABLE_LANGUAGES\s?=\s?([\[].*[\]]);/)[1].replace(/'/g, '"'));
    return langs.map(lang => lang.toLowerCase());
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', "❌ 🚧Can't read " + SCRIPT_CONF.LANG_LIST_PATH + ". Lang list will be ['en', 'ru', 'ua', 'jp']🚧", err);
    return ['us', 'ru', 'ua', 'jp'];
  } finally {
    console.log('-------------------------------');
  }
}

// Function to move and rename files
function moveAndRename(lang) {
  const sourcePath = path.join(SCRIPT_CONF.BASE_DIR, lang, SCRIPT_CONF.NOT_FOUND_PRERENDER_NAME, 'index.html');
  const destPath = path.join(SCRIPT_CONF.BASE_DIR, lang, SCRIPT_CONF.NOT_FOUND_FILE_NAME+'.html');

  // Check if the source file exists
  if (fs.existsSync(sourcePath)) {
    fs.renameSync(sourcePath, destPath);
    console.log(`Moved: ${sourcePath} -> ${destPath}`);
  } else {
    console.log(`File not found: ${sourcePath}`);
  }
}



async function prepare404() {
  const defaultLang = await getDefaultLang();

  const allLanguages = await getLanguages();

  const languages = ['', ...(allLanguages.filter((lang) => lang !== defaultLang))];


  languages.forEach(moveAndRename);
}
