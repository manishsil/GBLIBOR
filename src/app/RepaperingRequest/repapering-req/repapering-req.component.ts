import { Component, OnInit,ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { GbliborService } from '../../../service/gblibor.service';
import { Loan } from '../../model/loan';
import { Derivative } from '../../model/derivative';
import { Contract } from '../../model/contract';
import { LoginService } from 'src/service/login.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';


@Component({
  selector: 'app-repapering-req',
  templateUrl: './repapering-req.component.html',
  styleUrls: ['./repapering-req.component.css']
})
export class RepaperingReqComponent implements OnInit,AfterViewInit,OnDestroy {

  @ViewChild('stepper') stepper: MatStepper;
  stepIndex: number;
  selectedTab: number;
  isInitated: boolean;
  fileName: string;
  contractDt: Contract;
  currentStep = 0;
  processing = true;
  pdfSrc: string="https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  contractId: number;
  riskData: any[];
  financialLoanData: Loan;
  financialDerivtvData: Derivative;
  userDetails: User;
  subscription: Subscription;
  clientOutreach: {name: string, address: string, zip: string, phone: string, fax: string, email: string};

  constructor(private snackBar: MatSnackBar, private service: GbliborService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.subscription = this.loginService.getUserDetails().subscribe(dt => {
      this.userDetails = dt;
    });
  }

  onStepChange(event: any): void {
    this.stepIndex = event.selectedIndex;
    if (this.stepIndex === 3) {
      this.selectedTab = 5;
    } else if (this.stepIndex > 3) {
      this.selectedTab = 6;
    } else {
      this.selectedTab = 0;
    }
  }

  handleFileInput(files: FileList) {
    this.isInitated = false;
    const file: any = files.item(0);
    const formData = new FormData();
    formData.append('file', file);
    this.service.uploadFile(formData).subscribe(resp => {
      this.fileName = resp.fileName;
    });
  }

  loadInitiateData() {
    // server call to load intitiate screen data
    this.service.upload(this.fileName).subscribe(resp => {
      this.contractDt = resp;
      this.contractDt = {"id":1,"contractId":"CON0000000001","parentContractId":"","documentFileName":"mycontract.pdf","contractName":"Loan Document","legalEntityId":1,"legalEntityName":"XYZ","counterPartyId":1,"counterPartyName":"ABC","contractTemplate":"MASTER Loan Agreement","contractStartDate":"2020-09-01","contractExpiryDate":"2023-09-01","contractTypeId":1,"contractSubTypeId":1,"currStatusId":6,"createdOn":"2020-09-02T16:18:11.000+00:00","createdBy":"sm123456","libor":true,"amendmentDoc":false};
      this.isInitated = true;
      this.selectedTab = 0;
    });
  }

  loadReviewData() {
    this.service.loadReviewData(this.contractDt).subscribe(resp => {
      this.contractDt = resp;
      this.contractDt = {"id":1,"contractId":"CON0000000001","parentContractId":"","documentFileName":"mycontract.pdf","contractName":"Loan Document","legalEntityId":1,"legalEntityName":"XYZ","counterPartyId":1,"counterPartyName":"ABC","contractTemplate":"MASTER Loan Agreement","contractStartDate":"2020-09-01","contractExpiryDate":"2023-09-01","contractTypeId":1,"contractSubTypeId":1,"currStatusId":6,"createdOn":"2020-09-02T16:18:11.000+00:00","createdBy":"sm123456","libor":true,"amendmentDoc":false};
      this.showRiskData();
    });
  }

  laodTabDetails($event: any){
    if ($event.index === 0) {
      this.showRiskData();
    } else if ($event.index === 1) {
      this.showFinancialData();
    } else if ($event.index === 3) {
      this.showCollateralData();
    } else if ($event.index === 4) {
      this.showClientOutreachData();
    }
}

  showRiskData() {
    /* this.service.getRiskData(this.contractId).subscribe(dt => {
      this.riskData = dt;
    }); */
    this.riskData = [{"contractRiskId":1,"contractId":1,"riskId":"R000123","riskDesc":"This is Closed Risk Description","resolutionStatus":2},{"contractRiskId":2,"contractId":1,"riskId":"R000124","riskDesc":"This is Open Risk Description","resolutionStatus":1},{"contractRiskId":3,"contractId":1,"riskId":"R000124","riskDesc":"This is newly added open Risk Description","resolutionStatus":1}];
  }

  showFinancialData() {
    /* this.service.getFinancialLoanData(this.contractId).subscribe(dt => {
      this.financialLoanData = dt;
    });
    this.service.getFinancialDerivativeData(this.contractId).subscribe(dt => {
      this.financialDerivtvData = dt;
    }); */
    this.financialLoanData = {"loanContractFinancialId":1,"contractId":1,"counterPartyId":1,"loanAmount":2350000.0,"loanCurrency":"USD","startDate":"2020-09-04","maturityDate":"2023-09-04","tenorMonths":36,"rateOfInterest":2.06,"loanTypeId":1,"collateralInfo":"","paymentSchedule":1,"borrowerName":"XYZ LLC","lenderName":"ABC Corp Bank","adminAgentName":"Agent","jointLeadArrangerName":"Joint Lead Arranger","coSyndicationAgentName":"Co Syndication Agent","coDocumentationAgentName":"Co Documentation Agent"};

    this.financialDerivtvData = {"derivativeContractFinancialId":1,"contractId":1,"counterPartyId":1,"jurisdiction":"NEW YORK","governingLaw":"New YORK Law","masterAgreementType":"ISDA Master 2002","masterAgreementActive":"Y","creditSupportAnnex":"Credit support Annex for Swap","creditSupportAnnexActive":"Y","creditSupByTitleTransfer":"Y","initialMargin":1000000.0,"nettedAgainstVariation":"Y","nettingEligible":"Y","collateralEnforceability":"Y","triggerDowngrade":"Y","rehypothicationRights":"Y","colleteralType":"Stocks","validCurrencies":"USD,GBP","baseCurrency":"USD","valuationPercentage":10.0,"minTransferAmount":10000.0,"thresholdAmount":20000.0,"variationMargin":10.0,"triparty":"Y"};
  }

  showCollateralData() {
    //service call
  }

  showClientOutreachData() {
    //service call
    this.clientOutreach = {name: 'XYZ Corp', address: 'abc', zip: '7001', phone: '17389', fax: '2384', email: 'djfjd@gmail.com'};
  }

  sendEmail() {
    //send email
  }


  ngAfterViewInit() {
      //this.stepper.selectedIndex = 3; 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
}

}
