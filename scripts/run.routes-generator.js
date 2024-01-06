console.log('\x1b[44m%s\x1b[0m', '//////////////////[START run.routes-generator.ts]//////////////////');

const fs = require('fs');

const [build] = process.argv.slice(2); // ['prod']

const SCRIPT_CONF = {
  FILE_OUTPUT_PATH: 'tmp',
  ENVIRONMENT_PATH: `src/environments/environment.${build || 'prod'}.ts`,
  MAIN_LANG_PATH: 'src/constants/base/language.const.ts',
  LANG_LIST_PATH: 'src/constants/base/language.const.ts',
  SEO_ROUTES_PATH: `src/constants/base/routes.const.ts`,
};

generateRoutes();

// ---------------------------------------------------------
/**
 * Парсим файл с путями и преобразуем в удобный формат для генерации путей
 */
function getParsedRoutes() {
  try {
    const data = fs.readFileSync(SCRIPT_CONF.SEO_ROUTES_PATH, { encoding: 'utf8' })
      .match(/LINKS\s?=\s?(\[.*?\]);/ms)[1]
      .replace(/loadChildren\s?:\s?.*?\),\r\n/g, '');

    const regex = /"path":\s*'([^']*)'/g;
    let match;
    let result = '';

    while ((match = regex.exec(data)) !== null) {
      // Добавляем '/' к пути, если это главная страница (''), иначе добавляем '/путь'
      result += match[1] === '' ? '/\n' : `/${match[1]}\n`;
    }

    return result.split('\n');
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', "❌ 🚧Can't parse project's routes🚧", err);
  }
  return [];
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
    console.log(data.match(/AVAILABLE_LANGUAGES\s?=\s?([\[].*[\]]);/)[1].replace(/'/g, '"'))
    const langs = JSON.parse(data.match(/AVAILABLE_LANGUAGES\s?=\s?([\[].*[\]]);/)[1].replace(/'/g, '"'));
    return langs.map(lang => lang === 'US' ? 'en' : lang.toLowerCase());
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', "❌ 🚧Can't read " + SCRIPT_CONF.LANG_LIST_PATH + ". Lang list will be ['en', 'ru', 'ua', 'jp']🚧", err);
    return ['en', 'ru', 'ua', 'jp'];
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

async function generateRoutes() {
  const routes = (await getParsedRoutes() || []).filter(val => !!val);
  routes.push('/not-found');
  const defaultLang = await getDefaultLang() || 'US';
  const languages = await getLanguages() || [];
  const langRoutes = [
    routes,
    ...languages
        .filter(lang => lang !== defaultLang)
        .map(lang => routes.map(route => route === '/' ? '/'+lang : '/'+lang+route))
  ].flat();
  writeRoutes(langRoutes)
}
