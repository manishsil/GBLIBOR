import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { GbliborService } from '../../gblibor.service';
import { Loan } from '../../model/loan';
import { Derivative } from '../../model/derivative';


@Component({
  selector: 'app-repapering-req',
  templateUrl: './repapering-req.component.html',
  styleUrls: ['./repapering-req.component.css']
})
export class RepaperingReqComponent implements OnInit,AfterViewInit {

  @ViewChild('stepper') stepper: MatStepper;
  stepIndex: number;
  selectedTab: number;
  isInitated: boolean;
  fileToUploaded: {name: string, type: string, byteArr: any};
  documentDt: {"id":number,"contractId":string,"parentContractId":string,"documentFileName":string,"contractName":string,"legalEntityId":number,"legalEntityName":string,"counterPartyId":number,"counterPartyName":string,"contractTemplate":string,"contractStartDate":string,"contractExpiryDate":string,"contractTypeId":number,"contractSubTypeId":number,"currStatusId":number,"createdOn":string,"createdBy":string,"libor":true,"amendmentDoc":false};
  //documentDt: {contractId: string, type: string, customerId: string, subtype: string, libor: boolean, state: string};
  analysedDt: {risk: any, financial: any, collateral: any, workHistory: any, clientOutreach: any, approvals: any, verify: any};
  currentStep = 0;
  processing = true;
  pdfSrc: string="https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  contractId: number;
  riskData: any[] = [];
  financialLoanData: Loan;
  financialDerivtvData: Derivative;
  constructor(private snackBar: MatSnackBar, private service: GbliborService) { }

  ngOnInit(): void {
    this.fileToUploaded = {name: '', type: '', byteArr: ''};
    //this.documentDt = {contractId: '', type: '', customerId: '', subtype: '', libor: false, state: ''};
  }

  onStepChange(event: any): void {
    this.stepIndex = event.selectedIndex;
    if (this.stepIndex === 3) {
      this.selectedTab = 5;
    } else if (this.stepIndex > 3) {
      this.selectedTab = 6;
    } else {
      this.selectedTab = 0;
      this.showRiskData();
    }
  }

  handleFileInput(files: FileList) {
    this.isInitated = false;
    this.fileToUploaded = {name: '', type: '', byteArr: ''};
    const file: any = files.item(0);
    if ( /\.(jpe?g|png|gif|pdf)$/i.test(file.name) ) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.fileToUploaded.byteArr = fileReader.result;
      };
      fileReader.readAsDataURL(file);
      this.fileToUploaded.name = file.name;
      this.fileToUploaded.type = file.type;
    } else {
      this.snackBar.open('File Format not accepted', '', {
        duration: 3000, verticalPosition: 'top'});
    }
  }

  initiate() {
    // server call to upload file
    this.service.upload('sample.pdf').subscribe(resp => {
      console.log(JSON.stringify(resp));
    });
    this.service.saveOcr(this.fileToUploaded).subscribe(resp => {
      console.log(JSON.stringify(resp));
      this.documentDt = resp;
    });
    /* this.documentDt = {contractId: 'CON0000001', type: 'Derivative', customerId: 'CID00000001', subtype: 'Interest Rate Swap', libor: true, state: 'Initiated'}; */
    this.documentDt = {"id":1,"contractId":"CON0000000001","parentContractId":"","documentFileName":"mycontract.pdf","contractName":"Loan Document","legalEntityId":1,"legalEntityName":"XYZ","counterPartyId":1,"counterPartyName":"ABC","contractTemplate":"MASTER Loan Agreement","contractStartDate":"2020-09-01","contractExpiryDate":"2023-09-01","contractTypeId":1,"contractSubTypeId":1,"currStatusId":6,"createdOn":"2020-09-02T16:18:11.000+00:00","createdBy":"sm123456","libor":true,"amendmentDoc":false};
    this.isInitated = true;
    this.selectedTab = 0;


  }

  laodTabDetails($event: any){
    if ($event.index === 0) {
      this.showRiskData();
    } else if ($event.index === 1) {
      this.showFinancialData();
    }
}

  showRiskData() {
    this.service.getRiskData(this.contractId).subscribe(dt => {
      this.riskData = dt;
    });
    //this.riskData = [{"contractRiskId":1,"contractId":1,"riskId":"R000123","riskDesc":"This is Closed Risk Description","resolutionStatus":2},{"contractRiskId":2,"contractId":1,"riskId":"R000124","riskDesc":"This is Open Risk Description","resolutionStatus":1},{"contractRiskId":3,"contractId":1,"riskId":"R000124","riskDesc":"This is newly added open Risk Description","resolutionStatus":1}];
  }

  showFinancialData() {
    this.service.getFinancialLoanData(this.contractId).subscribe(dt => {
      this.financialLoanData = dt;
    });
    this.service.getFinancialDerivativeData(this.contractId).subscribe(dt => {
      this.financialDerivtvData = dt;
    });
    //this.financialLoanData = {"loanContractFinancialId":1,"contractId":1,"counterPartyId":1,"loanAmount":2350000.0,"loanCurrency":"USD","startDate":"2020-09-04","maturityDate":"2023-09-04","tenorMonths":36,"rateOfInterest":2.06,"loanTypeId":1,"collateralInfo":"","paymentSchedule":1,"borrowerName":"XYZ LLC","lenderName":"ABC Corp Bank","adminAgentName":"Agent","jointLeadArrangerName":"Joint Lead Arranger","coSyndicationAgentName":"Co Syndication Agent","coDocumentationAgentName":"Co Documentation Agent"};

    //this.financialDerivtvData = {"derivativeContractFinancialId":1,"contractId":1,"counterPartyId":1,"jurisdiction":"NEW YORK","governingLaw":"New YORK Law","masterAgreementType":"ISDA Master 2002","masterAgreementActive":"Y","creditSupportAnnex":"Credit support Annex for Swap","creditSupportAnnexActive":"Y","creditSupByTitleTransfer":"Y","initialMargin":1000000.0,"nettedAgainstVariation":"Y","nettingEligible":"Y","collateralEnforceability":"Y","triggerDowngrade":"Y","rehypothicationRights":"Y","colleteralType":"Stocks","validCurrencies":"USD,GBP","baseCurrency":"USD","valuationPercentage":10.0,"minTransferAmount":10000.0,"thresholdAmount":20000.0,"variationMargin":10.0,"triparty":"Y"};
  }


  ngAfterViewInit() {
      //this.stepper.selectedIndex = 3; 
  }

}
