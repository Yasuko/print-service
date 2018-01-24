import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { PrintComponent } from './print/print.component';
import { PrintStatusService } from './print/print-status.service';

import { ImageOrientationService, ImageMakerService } from './_lib_service/index';
import { PdfMakerService } from './_lib_service/index';
import { ListLayoutService, RecruiteLayoutService } from './_lib_service/index';
import { TacksheetLayoutService, PrintLayoutService } from './_lib_service/index';
import { TacksheetMakerService, ImageSaveService } from './_lib_service/index';
import { PostcardMakerService, RecruiteMakerService } from './_lib_service/index';

// Import Service
import { LavelSheetService, PostcardService} from './service/index';
import { PrintDataService, PrintData, PrintText} from './service/index';
import { SubjectsService } from './service/index';

// Import Componente Liblary
import { AlertComponent, LoadingComponent } from './_lib_component/index';

// Import Layout
import { RecruiteLayoutType1Service, RecruiteLayoutType2Service } from './_lib_service/index';
import { RecruiteLayoutType3Service, RecruiteLayoutType4Service } from './_lib_service/index';
import { RecruiteLayoutType5Service } from './_lib_service/index';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BusinessCardComponent,
    PostcardComponent,
    RecuruiteComponent,
    TacksheetComponent,
    LayoutComponent,
    PrintComponent,
    AlertComponent, LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    PdfMakerService,
    ListLayoutService, RecruiteLayoutService,
    TacksheetLayoutService, PrintLayoutService,
    LavelSheetService, PostcardService,
    TacksheetStatusService, PostcardStatusService,
    LayoutStatusService, PrintStatusService,
    TacksheetMakerService, ImageSaveService,
    PostcardMakerService, RecruiteMakerService,
    ImageOrientationService, ImageMakerService,
    PrintDataService, PrintData, PrintText,
    SubjectsService,
    RecruiteLayoutType1Service, RecruiteLayoutType2Service,
    RecruiteLayoutType3Service, RecruiteLayoutType4Service,
    RecruiteLayoutType5Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

