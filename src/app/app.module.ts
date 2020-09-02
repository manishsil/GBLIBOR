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
import { RepaperingReqComponent } from './RepaperingRequest/repapering-req/repapering-req.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    AppComponent,
    TemplateUploadComponent,
    ContractAnalysisComponent,
    DocumentSearchComponent,
    DocumentManagerComponent,
    RepaperingReqComponent
  ],
  imports: [
    BrowserModule,NgApexchartsModule,FormsModule,ReactiveFormsModule,
    AppRoutingModule,MatFormFieldModule,MatSliderModule,MatTableModule,CdkTableModule,MatPaginatorModule,
    MatStepperModule,MatIconModule, MatTabsModule, MatSnackBarModule,PdfViewerModule,
    HttpClientModule, BrowserAnimationsModule
  ],
  providers: [
    {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { displayDefaultIndicatorType: false }
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
