import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateUploadComponent } from './templateUpload/template-upload/template-upload.component';
import { DocumentSearchComponent } from './document-search/document-search.component';
import { ContractAnalysisComponent } from './contract-analysis/contract-analysis.component';
import { DocumentManagerComponent } from './document-manager/document-manager.component';
import { RepaperingReqComponent } from './RepaperingRequest/repapering-req/repapering-req.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { MyApprovalsComponent } from './my-approvals/my-approvals.component';
import { AnalyticsManagerComponent } from './analytics-manager/analytics-manager.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: ''} ,
  {path: 'login' , component: LoginComponent},
  {path: 'analytics' , component: AnalyticsManagerComponent},
  {path: 'repapering' , component: RepaperingReqComponent},
  {path: 'template' , component: TemplateUploadComponent},
  {path: 'documents' , component: DocumentManagerComponent},
  {path: 'search' , component: DocumentSearchComponent},
  {path: 'analysis' , component: ContractAnalysisComponent},
  {path: 'dashboard' , component: DashBoardComponent},
  {path: 'approvals' , component: MyApprovalsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


