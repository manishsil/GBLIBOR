import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateUploadComponent } from './templateUpload/template-upload/template-upload.component';
import { DocumentSearchComponent } from './document-search/document-search.component';
import { ContractAnalysisComponent } from './contract-analysis/contract-analysis.component';
import { DocumentManagerComponent } from './document-manager/document-manager.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'template'} , 
  {path: 'template' , component: TemplateUploadComponent},
  {path: 'documents' , component: DocumentManagerComponent},
  {path: 'search' , component: DocumentSearchComponent},
  {path: 'analysis' , component: ContractAnalysisComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


