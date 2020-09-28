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
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { QuillEditorComponent } from 'ngx-quill';
import { ContractMeta } from 'src/app/model/contractmeta';
import { SpinnerServiceService } from 'src/service/spinner-service.service';


@Component({
  selector: 'app-repapering-req',
  templateUrl: './repapering-req.component.html',
  styleUrls: ['./repapering-req.component.css']
})
export class RepaperingReqComponent implements OnInit,AfterViewInit,OnDestroy {

  @ViewChild('editor') editor: QuillEditorComponent;
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
  listdocumentMetaData: ContractMeta[];
  fallbackBenchmarkUnavailable: boolean;
  fallbackBenchmarkIllegal: boolean;
  editorContent: string;
  pageNum: number;
  toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']
  ];

  constructor(private snackBar: MatSnackBar, private service: GbliborService,
              private loginService: LoginService, private route: ActivatedRoute,
              public dialog: MatDialog, private spinnerService: SpinnerServiceService) {
                this.modules = {toolbar: this.toolbarOptions};
              }

  ngOnInit(): void {
    this.routesubc = this.route.queryParams.subscribe(params => {
      if (params && params.contractId) {
        this.contractId = params.contractId;
        const currStatusId = params.currStatus;
        if (currStatusId <= 3) {
          this.loadInitiateData();
          this.currentStep = 0;
        } else if (currStatusId  === 4) {
          this.loadReviewData();
          this.showFallbackData();
          this.currentStep = 1;
        } else if (currStatusId  === 5) {
          this.loadAmendmendData();
          this.currentStep = 2;
        } else if (currStatusId > 5 && currStatusId < 10) {
          this.loadAuthorizeData();
          this.currentStep = 3;
        } else if (currStatusId  === 10) {
          this.loadVerifyData();
          this.currentStep = 4;
        } else if (currStatusId  === 11) {
          this.loadCloseData();
          this.currentStep = 5;
        }

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
        this.showFallbackData();
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
      this.showFallbackData();
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
    this.spinnerService.setspinnerSubj(true);
    this.service.getWorkFlowIntiateData(this.contractId).subscribe(resp => {
      this.spinnerService.setspinnerSubj(false);
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
    this.service.getContractMetadata(this.contractId).subscribe(dt => {
      console.log(JSON.stringify(dt));
      this.listdocumentMetaData = dt.listdocumentMetaData;
      this.fallbackBenchmarkUnavailable = false;
      this.fallbackBenchmarkIllegal = false;
      this.listdocumentMetaData.forEach((ele, index) => {
        if (ele.domainContextDictionaryId === 'Fallback_Benchmark_Unavailable' && ele.headerTextContent) {
          this.fallbackBenchmarkUnavailable = true;
        }
        if (ele.domainContextDictionaryId === 'Fallback_Benchmark_Illegal' && ele.headerTextContent) {
          this.fallbackBenchmarkIllegal = true;
        }
        if (!this.editorContent && ele.dictionaryIdupdateRequired) {
          this.editorContent =
          ele.headerTextContent.replace(ele.domainContextPossibleNameDefinitions, "<span style='color:red'>" + ele.domainContextPossibleNameDefinitions + "</span>");
          this.pageNum = ele.headerPageNo;
          this.index = index;
        }
      });
    });
  }

  loadAmendmendData() {
    this.service.getAmendmentData(this.contractId).subscribe(dt => {
      this.contractDt = dt;
      console.log(JSON.stringify(dt));
      document.getElementById('pdfFrame1').setAttribute('src', this.pdfSrc);
      //document.getElementById('pdfFrame2').setAttribute('src', this.pdfSrc);
      //this.content = this.amendData[0];
    });
  }

  loadAuthorizeData() {
    this.service.getAuthorizeData(this.contractId).subscribe(dt => {
      this.contractDt = dt;
      document.getElementById('pdfFrame3').setAttribute('src', this.pdfSrc);
      //document.getElementById('pdfFrame4').setAttribute('src', this.pdfSrc);
      document.getElementById('pdfFrame4').setAttribute('src', this.service.previewUrl + '/' + this.contractId);
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
    this.listdocumentMetaData[this.index].domaincontextProposedFieldValue = this.editorContent;
    this.listdocumentMetaData.forEach((ele, index) => {
      if (index > this.index && ele.dictionaryIdupdateRequired) {
        this.editorContent =
        ele.headerTextContent.replace(ele.domainContextPossibleNameDefinitions, "<span style='color:red'>" + ele.domainContextPossibleNameDefinitions + "</span>");
        this.pageNum = ele.headerPageNo;
        this.index = index;
      }
    });
  }

  skip() {
    this.listdocumentMetaData.forEach((ele, index) => {
      if (index > this.index && ele.dictionaryIdupdateRequired) {
        this.editorContent =
        ele.headerTextContent.replace(ele.domainContextPossibleNameDefinitions, "<span style='color:red'>" + ele.domainContextPossibleNameDefinitions + "</span>");
        this.index = index;
      }
    });
  }

  prev() {
    this.listdocumentMetaData[this.index].domaincontextProposedFieldValue = this.editorContent;
    for (let i = this.listdocumentMetaData.length - 1; i >= 0; i--) {
      if (i < this.index && this.listdocumentMetaData[i].dictionaryIdupdateRequired) {
        this.editorContent = this.listdocumentMetaData[i].headerTextContent.replace(
          this.listdocumentMetaData[i].domainContextPossibleNameDefinitions,
          "<span style='color:red'>" + this.listdocumentMetaData[i].domainContextPossibleNameDefinitions + "</span>");
        this.pageNum = this.listdocumentMetaData[i].headerPageNo;
        this.index = i;
      }
    }
  }

  preview() {
    document.getElementById('pdfFrame2').setAttribute('src', this.service.previewUrl + '/' + this.contractId);
  }

  saveData() {
    this.spinnerService.setspinnerSubj(true);
    this.service.saveEditWorkflow({contractId: this.contractId, listDocumentMetadata: this.listdocumentMetaData}).subscribe(dt => {
      console.log(dt);
      this.spinnerService.setspinnerSubj(false);
    });
  }

  modify() {
    const range = this.editor.quillEditor.getSelection();
    if (range && range.length !== 0) {
      const text = this.editor.quillEditor.getText(range.index, range.length);
      console.log(text);
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '800px', data: this.listdocumentMetaData[this.index].domainContextPossibleValueDefinitions
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          let str = '';
          if (this.editorContent.includes('</span>')) {
            str = this.editorContent.replace("<span style='color:red'>" +
            this.listdocumentMetaData[this.index].domainContextPossibleNameDefinitions + "</span>", result + ' ');
          } else {
            str = this.editorContent.replace(text, result + ' ');
          }
          this.editorContent = str;
          this.listdocumentMetaData[this.index].domaincontextProposedFieldValue = this.editorContent;
        }
      });
    }
  }

  ngAfterViewInit() {
      //this.stepper.selectedIndex = 3; 
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
    this.routesubc.unsubscribe();
  }

}
