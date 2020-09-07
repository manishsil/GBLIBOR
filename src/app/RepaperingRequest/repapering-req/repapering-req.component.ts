import { Component, OnInit,ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { GbliborService } from '../../../service/gblibor.service';
import { Loan } from '../../model/loan';
import { Derivative } from '../../model/derivative';
import { Contract } from '../../model/contract';
import { LoginService } from '../../../service/login.service';
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
  pdfSrc: any; // "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
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
    formData.append('userid', this.userDetails.loginId);

    this.service.uploadFile(formData).subscribe(resp => {
      this.fileName = resp.documentFileName;
      this.contractId = resp.contractId;
    });
  }

  loadInitiateData() {
    // server call to load intitiate screen data
    this.service.getWorkFlowIntiateData(this.contractId).subscribe(resp => {
      this.contractDt = resp;
      this.isInitated = true;
      this.selectedTab = 0;
    });
  }

  loadOCRData() {
    // server call to load intitiate screen data
    this.service.getOcr(this.contractId).subscribe(resp => {
      this.snackBar.open('Contract Number ' + resp.contractId , '', {
        duration: 2000, verticalPosition: 'bottom'
      });
    });
  }

  loadReviewData() {
    this.service.loadReviewData(this.contractId).subscribe(resp => {
      this.contractDt = resp;
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
    this.service.getRiskData(this.contractId).subscribe(dt => {
      this.riskData = dt;
    });
  }

  showFinancialData() {
    if (this.contractDt.contractTypeId === 1) {
      this.service.getFinancialLoanData(this.contractId).subscribe(dt => {
        this.financialLoanData = dt;
      });
    } else if (this.contractDt.contractTypeId === 2) {
      this.service.getFinancialDerivativeData(this.contractId).subscribe(dt => {
        this.financialDerivtvData = dt;
      });
    }
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

  loadAmendmendData() {
    this.service.getAmendmentData(this.contractId).subscribe(dt => {
      this.contractDt = dt;
      console.log(JSON.stringify(dt));
    });
  }


  ngAfterViewInit() {
      //this.stepper.selectedIndex = 3; 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
}

}
