import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {environment} from "@environments/environment";
import {enableProdMode} from "@angular/core";
import * as Sentry from "@sentry/angular-ivy";
import {SentryDialogError} from "./error-types/sentry-dialog.error";

Sentry.init({
  dsn: "https://c8e6266218128f64b0dc7a76fb9aae59@o4506291716685824.ingest.sentry.io/4506291718258688",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  environment: environment.environmentName,
  release: `${environment.projectName}@${environment.version}`,
  beforeSend(event, hint) {
    const exception = hint.originalException;
    if (exception && exception instanceof SentryDialogError) {
      Sentry.showReportDialog({ eventId: event.event_id });
    }
    return event;
  }
});

Sentry.configureScope(scope => {
  scope.setTag("platform", "Client"); // Или "client" в зависимости от среды
});


if(environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
