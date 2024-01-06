const fs = require('fs');
const path = require('path');

const SCRIPT_CONF = {
  HTACCESS_OUTPUT_FOLDER: `dist/me/browser`,
  MAIN_LANG_PATH: 'src/constants/base/language.const.ts',
  LANG_LIST_PATH: 'src/constants/base/language.const.ts',
  HTACCESS_TEMPLATE_PATH: `.htaccess`
};

prepareHtaccesses();

function createHtaccess(lang, defaultLang) {
  const langPrefix = lang === defaultLang ? '' : lang;
  const originalHtaccess = fs.readFileSync(SCRIPT_CONF.HTACCESS_TEMPLATE_PATH, 'utf8');
  const newContent = originalHtaccess.replace('[[lang]]', langPrefix);
  const destPath = lang === 'us' ?
    `${SCRIPT_CONF.HTACCESS_OUTPUT_FOLDER}/.htaccess`
    : `${SCRIPT_CONF.HTACCESS_OUTPUT_FOLDER}/${lang}/.htaccess`;
  fs.writeFileSync(destPath, newContent);
}

/**
 * Получение дефолтного языка, пути которого не будут иметь кода "/", "games/" (не "pt/games")
 */
function getDefaultLang() {
  console.log('Parsing language.const.ts...');
  try {
    const data = fs.readFileSync(SCRIPT_CONF.MAIN_LANG_PATH, { encoding: 'utf8' });
    let lang = data.match(/DEFAULT_LANGUAGE\s?=\s?["'](.*)["'];/)[1];
    if (lang === 'US') lang = 'EN';
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

async function writeRoutes(routes) {
  fs.writeFile(SCRIPT_CONF.FILE_OUTPUT_PATH + '/routes.txt', routes.join('\n'), (err, data) => {
    if (err) {
      return console.error('\x1b[31m%s\x1b[0m', "❌ 🚧Can't write routes.txt🚧", err);
    }
    console.log('\x1b[32m%s\x1b[0m', '✨ Writing routes.txt - success!');
    console.log('\x1b[44m%s\x1b[0m', '//////////////////[END run.routes-generator.ts]//////////////////');
  });

}

async function prepareHtaccesses() {
  // Чтение исходного файла .htaccess
  const langs = await getLanguages();
  const defaultLang = await getDefaultLang();

  console.log(langs);

  langs.forEach(lang => createHtaccess(lang, defaultLang))
}

