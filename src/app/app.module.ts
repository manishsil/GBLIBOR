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
import { MatInputModule } from '@angular/material/input';
import { ContractAnalysisComponent } from './contract-analysis/contract-analysis.component';
import { DocumentSearchComponent } from './document-search/document-search.component';
import { DocumentManagerComponent } from './document-manager/document-manager.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartsModule } from 'ng2-charts';
import { RepaperingReqComponent } from './RepaperingRequest/repapering-req/repapering-req.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DashBoardComponent } from './dash-board/dash-board.component';
import {MatSelectModule} from '@angular/material/select';
import { QuillModule } from 'ngx-quill';
import { LoginComponent } from './login/login.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { MyApprovalsComponent } from './my-approvals/my-approvals.component';
import { AnalyticsManagerComponent } from './analytics-manager/analytics-manager.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MyContractsComponent } from './my-contracts/my-contracts.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateUploadComponent,
    ContractAnalysisComponent,
    DocumentSearchComponent,
    DocumentManagerComponent,
    RepaperingReqComponent,
    DashBoardComponent,
    LoginComponent,
    ContractDetailsComponent,
    MyApprovalsComponent,
    AnalyticsManagerComponent,
    DialogComponent,
    MyContractsComponent,
    PieChartComponent
  ],
  imports: [
    QuillModule.forRoot(),
    BrowserModule,NgApexchartsModule,FormsModule,ReactiveFormsModule,
    AppRoutingModule,MatFormFieldModule,MatInputModule,MatSliderModule,MatTableModule,CdkTableModule,MatPaginatorModule,
    MatStepperModule,MatIconModule, MatTabsModule, MatSelectModule,MatSnackBarModule,PdfViewerModule,MatCardModule,
    MatMenuModule, MatCheckboxModule,MatDialogModule, MatRadioModule, PdfViewerModule,
    HttpClientModule, BrowserAnimationsModule, ChartsModule
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
