console.log('\x1b[44m%s\x1b[0m', '//////////////////[START run.sitemap-generator.ts]//////////////////');
const fs = require('fs');

const [build] = process.argv.slice(2); // ['prod']

const SCRIPT_CONF = {
  ENVIRONMENT_PATH: `src/environments/environment.${build || 'prod'}.ts`,
  ROBOTS_TXT_TEMPLATE_PATH: `src/robots-template.txt`,
  SITEMAP_OUTPUT_FOLDER: `src`,
  PROTOCOL: build === 'prod' ? 'https://' : 'http://',
};

generateRobotsTxt();

// -----------------------------------------


async function generateRobotsTxt() {
  const hostName = await getHostName();
  const robotsTxt = (await getRobotsTxtTemplate()).replace(/\[\[HOSTNAME]]/, hostName);

  try {
    console.log('writing sitemap.xml...');
    fs.writeFileSync(SCRIPT_CONF.SITEMAP_OUTPUT_FOLDER ? SCRIPT_CONF.SITEMAP_OUTPUT_FOLDER + '/robots.txt' : 'robots.txt', robotsTxt);
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', "❌ 🚧Can't write sitemap.xml", err);
  } finally {
    console.log('\x1b[32m%s\x1b[0m', '✨ Writing sitemap.xml - success!');
  }
  console.log('\x1b[44m%s\x1b[0m', '//////////////////[END run.sitemap-generator.ts]//////////////////');
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

async function getRobotsTxtTemplate() {
  console.log('Parsing language.const.ts...');
  try {
    return  fs.readFileSync(SCRIPT_CONF.ROBOTS_TXT_TEMPLATE_PATH, { encoding: 'utf8' });
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', "❌ 🚧Can't read " + SCRIPT_CONF.ROBOTS_TXT_TEMPLATE_PATH + "!!!!!!!!!!!!!!!!!", err);
    return '';
  } finally {
    console.log('-------------------------------');
  }
}
