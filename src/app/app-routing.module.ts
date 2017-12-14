import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { BusinessCardComponent } from './business_card/business_card.component';
import { PostcardComponent } from './postcard/postcard.component';
import { RecuruiteComponent } from './recruite/recruite.component';
import { TacksheetComponent } from './tacksheet/tacksheet.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {
        path: '',
        component:  MainComponent,
    },
    {
        path: 'main',
        component:  MainComponent,
    },
    {
        path: 'business',
        component: BusinessCardComponent
    },
    {
        path:   'postcard',
        component:  PostcardComponent,
    },
    {
        path:   'recruite',
        component:  RecuruiteComponent,
    },
    {
        path:   'tacksheet',
        component:  TacksheetComponent,
    },
    {
        path:   'layout',
        component:  LayoutComponent,
    },
    {
        path: '**',
        redirectTo: 'main'
    }
];
@NgModule({
    imports:    [
        RouterModule.forRoot (routes)
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
