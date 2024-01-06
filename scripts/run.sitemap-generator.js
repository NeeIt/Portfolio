console.log('\x1b[44m%s\x1b[0m', '//////////////////[START run.sitemap-generator.ts]//////////////////');
const fs = require('fs');

const [build] = process.argv.slice(2); // ['prod']

const SCRIPT_CONF = {
  SEO_ROUTES_PATH: `src/constants/base/routes.const.ts`,
  ENVIRONMENT_PATH: `src/environments/environment.${build || 'prod'}.ts`,
  SITEMAP_OUTPUT_FOLDER: `src`,
  PROTOCOL: build === 'prod' ? 'https://' : 'http://',
  MAIN_LANG_PATH: 'src/constants/base/language.const.ts',
  LANG_LIST_PATH: 'src/constants/base/language.const.ts',
};

generateMainSitemap();

// -----------------------------------------

/**
 * Парсим файл с путями и преобразуем в удобный формат для генерации путей
 */
function getParsedRoutes() {
  try {
    const data = fs.readFileSync(SCRIPT_CONF.SEO_ROUTES_PATH, { encoding: 'utf8' })
      .match(/LINKS\s?=\s?(\[.*?\]);/ms)[1]
      .replace(/loadChildren\s?:\s?.*?\),\r\n/g, '')
      .replace(/data\s?:\s?\{[^}]*?(isSeoPage\s?:\s?(true|false))[^}s]*?.*?\}/g, (match, p1, p2, p3) => {
        return p2 ? '"isSeoPage":' + p2 : '\"isSeoPage" : false';
      })
      .replace(/'/g, '"');
    return JSON.parse(data).filter(route => !!route.isSeoPage).map(route => '/'+route.path);
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', "❌ 🚧Can't parse project's routes🚧", err);
  }
  return [];
}

/**
 * Генерация списка сайтмап для главной мапы
 */
async function generateMainSitemap() {
  const siteMapTimeStamp = new Date().toJSON().substring(0, 10);
  let mainSitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';


  const languages = await getLanguages();
  const hostName = await getHostName();

  // ------ ГЛАВНЫЕ СТРАНИЦЫ --------
  const mainRoutes = [...new Set(getParsedRoutes())];
  mainSitemap += `<sitemap>\n<loc>${hostName}/sitemap.main.xml</loc>\n<lastmod>${siteMapTimeStamp}</lastmod>\n</sitemap>\n`;
  generateSitemap('main', mainRoutes, languages, hostName);

  mainSitemap += '</sitemapindex>';
  try {
    console.log('writing sitemap.xml...');
    fs.writeFileSync(SCRIPT_CONF.SITEMAP_OUTPUT_FOLDER ? SCRIPT_CONF.SITEMAP_OUTPUT_FOLDER + '/sitemap.xml' : 'sitemap.xml', mainSitemap);
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', "❌ 🚧Can't write sitemap.xml", err);
  } finally {
    console.log('\x1b[32m%s\x1b[0m', '✨ Writing sitemap.xml - success!');
  }
  console.log('\x1b[44m%s\x1b[0m', '//////////////////[END run.sitemap-generator.ts]//////////////////');
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

async function getHostName() {
  console.log('Parsing environment...');
  try {
    const data = fs.readFileSync(SCRIPT_CONF.ENVIRONMENT_PATH, { encoding: 'utf8' });
    return SCRIPT_CONF.PROTOCOL + data.match(/hostName\s?:\s?["'](.*?)["'],/)[1];
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', "❌ 🚧Can't read " + SCRIPT_CONF.ENVIRONMENT_PATH +"!!!!!!!!!!!!!!!!!!!!", err);
    return 'HOSTNAME_NOT_FOUND';
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
    return langs.map(lang => lang === 'US' ? 'en' : lang.toLowerCase());
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', "❌ 🚧Can't read " + SCRIPT_CONF.LANG_LIST_PATH + ". Lang list will be ['en', 'ru', 'ua', 'jp']🚧", err);
    return ['en', 'ru', 'ua', 'jp'];
  } finally {
    console.log('-------------------------------');
  }
}


/**
 * Генерация сайтмапы по переданному имени и путям
 */
async function generateSitemap(name, routes, langs, hostName) {
  const fileName = `sitemap.${name}.xml`;
  try {
    const defaultLang = getDefaultLang() || 'en';
    let set =
      '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xhtml="http://www.w3.org/1999/xhtml" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd">\n';
    langs.forEach((curLang) => {
      routes.forEach((path) => {
        set += `<url>\n<loc>${hostName}${curLang.substring(0, 2) === defaultLang ? '' : '/' + curLang.substring(0, 2)}${
          path === '/' ? '' : path
        }</loc>\n<xhtml:link rel="alternate" hreflang="x-default" href="${hostName}${
          curLang.substring(0, 2) === defaultLang ? '' : '/' + curLang.substring(0, 2)
        }${path === '/' ? '' : path}" />\n`;
        langs.forEach((lang) => {
          set += `<xhtml:link rel="alternate" hreflang="${lang}" href="${hostName}${
            lang.substring(0, 2) === defaultLang ? '' : '/' + lang.substring(0, 2)
          }${path === '/' ? '' : path}" />\n`;
        });
        set += `</url>\n`;
      });
    });
    set += '</urlset>\n';
    console.log('Writing ' + fileName + '...');
    fs.writeFileSync(SCRIPT_CONF.SITEMAP_OUTPUT_FOLDER ? SCRIPT_CONF.SITEMAP_OUTPUT_FOLDER + '/' + fileName : fileName, set);
    console.log('\x1b[32m%s\x1b[0m', '✨ Writing ' + fileName + ' - success!');
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', "❌ 🚧Can't write " + fileName + '🚧', err);
  } finally {
    console.log('-------------------------------');
  }
}
