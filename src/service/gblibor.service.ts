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
    return this.http.get<any>(environment.apiUrl + '/find/workflow/initiate/' + contractId).pipe(catchError(this.erroHandler));
  }
  upload(filename: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/upload/scandoc/' + filename).pipe(catchError(this.erroHandler));
  }

  scanUpload(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/save/workflow/scanupload').pipe(catchError(this.erroHandler));
  }

  getOcr(contractid: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/ocr/workflow/' + contractid).pipe(catchError(this.erroHandler));
  }

  loadReviewData(data: any) {
    return this.http.get<any>(environment.apiUrl + '/find/workflow/review/' + data);
    /* return this.http.post<any>(environment.apiUrl + '/save/workflow/initiate', data).pipe(map(res => {
      return res;
    }), mergeMap(res => this.http.get<any>(environment.apiUrl + '/find/workflow/review/' + res.contractId))); */
  }

  getRiskData(contractId: number) {
    return this.http.get<any>(environment.apiUrl + '/find/contractrisk/' + contractId).pipe(catchError(this.erroHandler));
  }

  getFinancialLoanData(contractId: number) {
    return this.http.get<any>(environment.apiUrl + '/find/loan/' + contractId).pipe(catchError(this.erroHandler));
  }

  getFinancialDerivativeData(contractId: number) {
    return this.http.get<any>(environment.apiUrl + '/find/derivative/' + contractId).pipe(catchError(this.erroHandler));
  }
  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
}
