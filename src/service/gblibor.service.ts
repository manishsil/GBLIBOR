import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GbliborService {

  constructor( private http: HttpClient) { }

  loggedUser = '';

  getUserDetails(username: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/find/user/' + username ).pipe(catchError(this.erroHandler));
  }

  uploadFile(file: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/uploadFile', file ).pipe(catchError(this.erroHandler));
  }

  getWorkFlowIntiateData(contractId: number) {
    return this.http.post<any>(environment.apiUrl + '/initiate/workflow', contractId).pipe(catchError(this.erroHandler));
  }
  upload(filename: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/upload/scandoc/' + filename).pipe(catchError(this.erroHandler));
  }

  scanUpload(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/save/workflow/scanupload').pipe(catchError(this.erroHandler));
  }

  getOcr(contractid: number): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/ocr/workflow', contractid).pipe(catchError(this.erroHandler));
  }

  loadReviewData(contractid: number) {
    return this.http.post<any>(environment.apiUrl + '/review/workflow',  contractid);
    /* return this.http.post<any>(environment.apiUrl + '/save/workflow/initiate', data).pipe(map(res => {
      return res;
    }), mergeMap(res => this.http.get<any>(environment.apiUrl + '/find/workflow/review/' + res.contractId))); */
  }

  getAmendmentData(contractid: number): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/edit/workflow', contractid).pipe(catchError(this.erroHandler));
  }

  getAuthorizeData(contractid: number): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/authorize/workflow', contractid).pipe(catchError(this.erroHandler));
  }

  getVerifyData(contractid: number): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/verify/workflow', contractid).pipe(catchError(this.erroHandler));
  }

  getCloseData(contractid: number): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/close/workflow', contractid).pipe(catchError(this.erroHandler));
  }

  getRiskData(contractId: number) {
    return this.http.post<any>(environment.apiUrl + '/find/contractrisk', contractId).pipe(catchError(this.erroHandler));
  }

  getFinancialLoanData(contractId: number) {
    return this.http.post<any>(environment.apiUrl + '/find/loan', contractId).pipe(catchError(this.erroHandler));
  }

  getFinancialDerivativeData(contractId: number) {
    return this.http.post<any>(environment.apiUrl + '/find/derivative', contractId).pipe(catchError(this.erroHandler));
  }

  getCollateralData(contractId: number) {
    return this.http.post<any>(environment.apiUrl + '/find/collateral', contractId).pipe(catchError(this.erroHandler));
  }

  getWorkHistoryData(contractId: number) {
    return this.http.post<any>(environment.apiUrl + '/find/workhistory', contractId).pipe(catchError(this.erroHandler));
  }

  getClientOutreachData(contractId: number) {
    return this.http.post<any>(environment.apiUrl + '/find/outreach', contractId).pipe(catchError(this.erroHandler));
  }

  getApprovalsData(contractId: number) {
    return this.http.post<any>(environment.apiUrl + '/find/approval', contractId).pipe(catchError(this.erroHandler));
  }

  getVerifyTabData(contractId: number) {
    return this.http.post<any>(environment.apiUrl + '/find/verify', contractId).pipe(catchError(this.erroHandler));
  }

  getMyApprovalsData(username: string) {
    return this.http.get<any>(environment.apiUrl + '/find/myapproval' + username).pipe(catchError(this.erroHandler));
  }
  getApproveRisk(contractId: number) {
    return this.http.post<any>(environment.apiUrl + '/authrisk/workflow', contractId).pipe(catchError(this.erroHandler));
  }
  getApproveProgram(contractId: number) {
    return this.http.post<any>(environment.apiUrl + '/authprogram/workflow', contractId).pipe(catchError(this.erroHandler));
  }
  getApproveLegal(contractId: number) {
    return this.http.post<any>(environment.apiUrl + '/authlegal/workflow', contractId).pipe(catchError(this.erroHandler));
  }
  getApproveTreasury(contractId: number) {
    return this.http.post<any>(environment.apiUrl + '/authtreasury/workflow', contractId).pipe(catchError(this.erroHandler));
  }

  getGlobalData() {
    return this.http.get<any>(environment.apiUrl + '/get/domaindata/global').pipe(catchError(this.erroHandler));
  }

  getFallbackData(contractId: number) {
    return this.http.post<any>(environment.apiUrl + '/get/fallbackdata', contractId).pipe(catchError(this.erroHandler));
  }

  getContractMetadata(contractId: number) {
    return this.http.get<any>(environment.apiUrl + '/get/contractmetadata/' + contractId).pipe(catchError(this.erroHandler));
  }

  getAllContracts() {
    return this.http.get<any>(environment.apiUrl + '/get/contracts/all').pipe(catchError(this.erroHandler));
  }

  saveEditWorkflow(obj: any) {
    return this.http.post<any>(environment.apiUrl + '', obj).pipe(catchError(this.erroHandler));
  }

  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }


}
