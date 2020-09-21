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
import { Approval } from 'src/app/model/approval';
import { ActivatedRoute } from '@angular/router';


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
  pdfSrc: any;
  contractId: number;
  counterPartyId: number;
  fallbackData: any;
  riskData: any[];
  financialLoanData: Loan;
  financialDerivtvData: Derivative;
  userDetails: User;
  subscription: Subscription;
  routesubc: Subscription;
  clientOutreach: {name: string, address: string, zip: string, phone: string, fax: string, email: string};
  approvalsDt: Approval[];
  modules = {};
  content: string;
  index = 0;
  amendData = ['This is paragraph 1', 'This is paragraph 2', 'This is paragraph 3'];
  verifyDt: {state: string, verifier: string, notes: string, updatedOn: string}[];
  statusIds = {1: 'Pending', 2: 'completed', 3: 'Rejected', 4: 'Cancelled'};

  constructor(private snackBar: MatSnackBar, private service: GbliborService,
              private loginService: LoginService, private route: ActivatedRoute) {
                this.modules = {toolbar: [['bold', 'italic', 'underline', 'strike']]};

              }

  ngOnInit(): void {
    this.routesubc = this.route.queryParams.subscribe(params => {
      if (params && params.cId) {
        this.contractId = params.cId;
        this.loadAuthorizeData();
        this.currentStep = 3;
      }
    });
    /* this.subscription = this.loginService.getUserDetails().subscribe(dt => {
      this.userDetails = dt;
    }); */
  }

  onStepChange(event: any): void {
    this.stepIndex = event.selectedIndex;
    /* if (this.stepIndex === 3) {
      this.selectedTab = 5;
    } else if (this.stepIndex > 3) {
      this.selectedTab = 6;
    } else {
      this.selectedTab = 0;
    } */
    switch (this.stepIndex){
      case 1: {
        this.loadReviewData();
        break;
      }
      case 2: {
         this.loadAmendmendData();
         break;
      }
      case 3: {
        this.loadAuthorizeData();
        break;
      }
      case 4: {
         this.loadVerifyData();
         break;
      }
      case 5: {
        this.loadCloseData();
        break;
     }
      default: {
         break;
      }
   }
  }

  laodTabDetails($event: any){
    if ($event.index === 0) {
      this.showRiskData();
    } else if ($event.index === 1) {
      this.showRiskData();
    } else if ($event.index === 2) {
      this.showFinancialData();
    } else if ($event.index === 3) {
      this.showCollateralData();
    } else if ($event.index === 4) {
      this.showWorkhistoryData();
    } else if ($event.index === 5) {
      this.showClientOutreachData();
    } else if ($event.index === 6) {
      this.showApprovalsData();
    } else if ($event.index === 7) {
      this.showVerifyData();
    }
  }

  handleFileInput(files: FileList) {
    this.isInitated = false;
    const file: any = files.item(0);
    const formData = new FormData();
    formData.append('file', file);
    //formData.append('userid', this.userDetails.loginId);
    formData.append('userid', this.loginService.loginId);

    this.service.uploadFile(formData).subscribe(resp => {
      this.fileName = resp.documentFileName;
      this.contractId = resp.contractId;
      this.snackBar.open('File Uploaded Successfully', '', {
        duration: 2000, verticalPosition: 'bottom'
      });
    });
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.pdfSrc = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  }

  loadInitiateData() {
    // server call to load intitiate screen data
    this.service.getWorkFlowIntiateData(this.contractId).subscribe(resp => {
      this.contractDt = resp;
      this.counterPartyId = resp.counterPartyId;
      this.isInitated = true;
      this.selectedTab = 0;
    });
  }

  loadOCRData() {
    // server call to load intitiate screen data
    this.service.getOcr(this.contractId).subscribe(resp => {
      this.snackBar.open('Contract Number ' + resp.contractId , '', {
        duration: 2500, verticalPosition: 'bottom'
      });
    });
  }

  loadReviewData() {
    this.service.loadReviewData(this.contractId).subscribe(resp => {
      this.contractDt = resp;
      this.showRiskData();
    });
  }

  showRiskData() {
    this.service.getRiskData(this.contractId).subscribe(dt => {
      this.riskData = dt;
    });
  }

  showFinancialData() {
    if (this.contractDt.contractTypeId === 1) {
      this.service.getFinancialLoanData(this.counterPartyId).subscribe(dt => {
        this.financialLoanData = dt;
      });
    } else if (this.contractDt.contractTypeId === 2) {
      this.service.getFinancialDerivativeData(this.counterPartyId).subscribe(dt => {
        this.financialDerivtvData = dt;
      });
    }
  }

  showCollateralData() {
    //service call
  }

  showWorkhistoryData() {
    this.service.getWorkHistoryData(this.contractId).subscribe(dt => {
      console.log(JSON.stringify(dt));
    });
  }

  showClientOutreachData() {
    /* this.service.getClientOutreachData(this.contractId).subscribe(dt => {
      console.log(JSON.stringify(dt));
      this.clientOutreach = dt;
    }); */
    this.clientOutreach = {name: 'XYZ Corp', address: 'Sector B, New Delhi', zip: '110011', phone: '01186745239', fax: '23846985', email: 'libor@gmail.com'};
  }

  sendEmail() {
    //send email
  }

  showApprovalsData() {
    this.service.getApproveLegal(this.contractId).subscribe(dt => {
      this.approvalsDt = [];
      this.approvalsDt.push(dt);
      this.contractDt.currStatusId = 6;
      console.log(JSON.stringify(dt));
    });
    //this.approvalsDt = [{contractId: 123,state: 'Autorize', approver: 'Abc Xyz', groupName: 'RISK-MGMT', responsibility: 'Risk Management', comments: 'ok', createdOn: '02/02/2020', updatedOn: '02/04/2020'}];

  }

  approve() {
    if (this.contractDt.currStatusId === 6) {
      this.service.getApproveProgram(this.contractId).subscribe(dt => {
        this.approvalsDt = [];
        this.approvalsDt.push(dt);
        this.contractDt.currStatusId = 7;
        console.log(JSON.stringify(dt));
      });
    } else if (this.contractDt.currStatusId === 7) {
      this.service.getApproveRisk(this.contractId).subscribe(dt => {
        this.approvalsDt = [];
        this.approvalsDt.push(dt);
        this.contractDt.currStatusId = 8;
        console.log(JSON.stringify(dt));
      });
    } else if (this.contractDt.currStatusId === 8) {
      this.service.getApproveTreasury(this.contractId).subscribe(dt => {
        this.approvalsDt = [];
        this.approvalsDt.push(dt);
        this.contractDt.currStatusId = 9;
        console.log(JSON.stringify(dt));
      });
    }

  }
  showVerifyData() {
    this.service.getVerifyTabData(this.contractId).subscribe(dt => {
      console.log(JSON.stringify(dt));
      this.verifyDt = dt;
    });
    //this.verifyDt = [{state: 'Verified', verifier: 'Abc Xyz', notes: 'verification done', updatedOn: '02/05/2020'}];

  }

  showFallbackData() {
    this.service.getFallbackData(this.contractId).subscribe(dt => {
      console.log(JSON.stringify(dt));
      this.fallbackData = dt;
    });
  }

  loadAmendmendData() {
    this.service.getAmendmentData(this.contractId).subscribe(dt => {
      this.contractDt = dt;
      console.log(JSON.stringify(dt));
      document.getElementById('pdfFrame1').setAttribute('src', this.pdfSrc);
      this.content = this.amendData[0];
    });
  }

  loadAuthorizeData() {
    this.service.getAuthorizeData(this.contractId).subscribe(dt => {
      this.contractDt = dt;
      document.getElementById('pdfFrame3').setAttribute('src', this.pdfSrc);
    //document.getElementById('pdfFrame4').setAttribute('src', this.pdfSrc);
    });
  }
  loadVerifyData() {
    this.service.getVerifyData(this.contractId).subscribe(dt => {
      this.contractDt = dt;
    });
  }
  loadCloseData() {
    this.service.getCloseData(this.contractId).subscribe(dt => {
      this.contractDt = dt;
    });
  }

  save() {
    console.log(this.content);
    this.amendData[this.index] = this.content;
    this.index += 1;
    const data = this.amendData[this.index];
    this.content = data ? data : '';
  }

  skip() {
    this.index += 1;
    const data = this.amendData[this.index];
    this.content = data ? data : '';
  }

  preview() {
    //service call
    console.log(JSON.stringify(this.amendData));
  }

  ngAfterViewInit() {
      //this.stepper.selectedIndex = 3; 
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
    this.routesubc.unsubscribe();
  }

}
