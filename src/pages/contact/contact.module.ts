import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from "./contact-routing.module";
import { ContactComponent } from "./contact.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import { ContactPathTextComponent } from './contact-path-text/contact-path-text.component';



@NgModule({
  declarations: [
    ContactComponent,
    ContactPathTextComponent
  ],
    imports: [
        CommonModule,
        ContactRoutingModule,
        ReactiveFormsModule,
        MatIconModule,
        TranslateModule,
    ]
})
export class ContactModule { }
