import { NgModule } from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TransferState} from "@angular/platform-browser";
import {translateServerLoaderFactory} from "@modules/translate/translate-server-loader";

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState]
      }
    })
  ],
  providers: [
    {
      provide: 'isServer',
      useValue: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
