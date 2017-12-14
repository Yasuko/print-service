import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
// import Route Component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './main/main.component';
import { BusinessCardComponent } from './business_card/business_card.component';
import { PostcardComponent } from './postcard/postcard.component';
import { PostcardStatusService } from './postcard/postcard-status.service';
import { RecuruiteComponent } from './recruite/recruite.component';
import { TacksheetComponent } from './tacksheet/tacksheet.component';
import { TacksheetStatusService } from './tacksheet/tacksheet-status.service';
import { LayoutComponent } from './layout/layout.component';
import { LayoutStatusService } from './layout/layout-status.service';

import { ImageOrientationService } from './_lib_service/index';
import { PdfMakerService } from './_lib_service/index';
import { ListLayoutService, RecruiteLayoutService } from './_lib_service/index';
import { TacksheetLayoutService } from './_lib_service/index';
import { TacksheetMakerService, ImageSaveService } from './_lib_service/index';
import { PostcardMakerService, RecruiteMakerService } from './_lib_service/index';

// Import Service
import { LavelSheetService, PostcardService} from './service/sheetDesine/index';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BusinessCardComponent,
    PostcardComponent,
    RecuruiteComponent,
    TacksheetComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    PdfMakerService,
    ListLayoutService,
    RecruiteLayoutService,
    TacksheetLayoutService,
    LavelSheetService, PostcardService,
    TacksheetStatusService, PostcardStatusService, LayoutStatusService,
    TacksheetMakerService, ImageSaveService,
    PostcardMakerService, RecruiteMakerService,
    ImageOrientationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

