import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule, TransferState} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TitleComponent } from "@components/layout/title/title.component";
import { CursorModule } from "@modules/cursor/cursor.module";
import { LightModeButtonModule } from "@components/components/light-mode-button/light-mode-button.module";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { translateBrowserLoaderFactory } from "@modules/translate/translate-browser-loader";
import { TranslateAnimationModule } from "@directives/translate-animation/translate-animation.module";
import { MatIconModule } from "@angular/material/icon";
import {Router, UrlSerializer} from "@angular/router";
import * as Sentry from "@sentry/angular-ivy";
import {NavigationModule} from "@components/layout/navigation/navigation.module";
import {NavigationIndicatorComponent} from "@components/layout/navigation-indicator/navigation-indicator.component";
import {MobileNavigationPanelModule} from "@components/layout/mobile-navigation-panel/mobile-navigation-panel.module";
import {SlashAppendedUrlSerializer} from "../other/url-serializer";

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    NavigationIndicatorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    // ------ LANGUAGES START -------
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState]
      }
    }),
    TranslateAnimationModule,
    // ------ LANGUAGES END -------
    // ------ COMPONENTS START -------
    NavigationModule,
    LightModeButtonModule,
    CursorModule,
    MobileNavigationPanelModule
    // ------ COMPONENTS END -------
  ],
  providers: [
    {
      provide: 'isServer',
      useValue: false
    },
    // ------ SENTRY START -------
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
    // ----- SENTRY END ------
    { provide: UrlSerializer, useClass: SlashAppendedUrlSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
