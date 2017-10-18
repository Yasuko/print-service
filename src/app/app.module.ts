import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
// import Route Component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './main/main.component';
import { BusinessCardComponent } from './business_card/business_card.component';
import { PostcardComponent } from './postcard/postcard.component';
import { RecuruiteComponent } from './recruite/recruite.component';
import { TacksheetComponent } from './tacksheet/tacksheet.component';

import { PdfMakerService } from './_lib_service/index';
import { ListLayoutService, RecruiteLayoutService } from './_lib_service/index';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BusinessCardComponent,
    PostcardComponent,
    RecuruiteComponent,
    TacksheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    PdfMakerService,
    ListLayoutService,
    RecruiteLayoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
