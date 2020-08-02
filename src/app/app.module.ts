import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateUploadComponent } from './templateUpload/template-upload/template-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ContractAnalysisComponent } from './contract-analysis/contract-analysis.component';
import { DocumentSearchComponent } from './document-search/document-search.component';
import { DocumentManagerComponent } from './document-manager/document-manager.component';
import { NgApexchartsModule } from "ng-apexcharts";



@NgModule({
  declarations: [
    AppComponent,
    TemplateUploadComponent,
    ContractAnalysisComponent,
    DocumentSearchComponent,
    DocumentManagerComponent
  ],
  imports: [
    BrowserModule,NgApexchartsModule,
    AppRoutingModule,MatFormFieldModule,MatSliderModule,MatTableModule,CdkTableModule,MatPaginatorModule,
    HttpClientModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }