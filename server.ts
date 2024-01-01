import 'localstorage-polyfill';
import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { join } from 'path';
import * as express from 'express';
import * as domino from "domino";
import * as fs from "fs";

import { AppServerModule } from './src/main.server';
import * as Sentry from "@sentry/node";
import {environment} from "@environments/environment";
import {Integrations} from "@sentry/node";


// ----- SENTRY START -----
Sentry.init({
  dsn: "https://c8e6266218128f64b0dc7a76fb9aae59@o4506291716685824.ingest.sentry.io/4506291718258688",
  integrations: [
    new Integrations.Http({ tracing: true }), // Если вы хотите включить трассировку для HTTP-запросов
  ],
  // Установите степень трассировки, которая вам нужна
  tracesSampleRate: 1.0,
  environment: environment.environmentName,
  release: `${environment.projectName}@${environment.version}`,
});

Sentry.configureScope(scope => {
  scope.setTag("platform", "SSR"); // Или "client" в зависимости от среды
});

// ----- SENTRY END -----

/**
 * Перенос свойств браузера в объект global
 */
function simulateBrowserProps(): void {
  const template = fs.readFileSync('dist/me/browser/index.html').toString();
  // Here we imitate browser properties
  const win: any = domino.createWindow(template);
  const { Node, navigator, Event, document, HTMLElement } = win;
  const browserProperties: any = {
    window: win,
    localStorage,
    Node,
    navigator,
    Event,
    KeyboardEvent: Event,
    MouseEvent: Event,
    HTMLElement,
    document,
    ErrorEvent: Event,
    getComputedStyle: () => null,
    cancelAnimationFrame: (id: number) => {
      clearTimeout(id);
    },
    requestAnimationFrame: (callback: any) => setTimeout(callback, 16)
  };
  browserProperties.HTMLElement.prototype.getBoundingClientRect = () => {
    return { right: '', left: '', top: '', bottom: '' };
  };

  for (const key of Object.keys(browserProperties)) {
    (global as any)[key] = browserProperties[key];
  }
}


// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/me/browser');
  const indexHtml = fs.existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

simulateBrowserProps();

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
