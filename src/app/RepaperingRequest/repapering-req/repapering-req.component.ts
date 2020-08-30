import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-repapering-req',
  templateUrl: './repapering-req.component.html',
  styleUrls: ['./repapering-req.component.css']
})
export class RepaperingReqComponent implements OnInit,AfterViewInit {

  isInitated: boolean;
  fileToUploaded: {name: string, type: string, byteArr: any};
  documentDt: {contractId: string, type: string, customerId: string, subtype: string, libor: boolean, state: string};
  analysedDt: {risk: any, financial: any, collateral: any, workHistory: any, clientOutreach: any, approvals: any, verify: any};
  currentStep: number =0;
  processing: boolean= true;
  pdfSrc: string="https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fileToUploaded = {name: '', type: '', byteArr: ''};
    this.documentDt = {contractId: '', type: '', customerId: '', subtype: '', libor: false, state: ''};
    this.analysedDt = {risk: [], financial: [], collateral: [], workHistory: [], clientOutreach: [], approvals: [], verify: []};
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
    this.documentDt = {contractId: 'CON0000001', type: 'Derivative', customerId: 'CID00000001',
                        subtype: 'Interest Rate Swap', libor: true, state: 'Initiated'};
    this.isInitated = true;

    this.analysedDt.risk =
    [{riskA: 'Risk 11', riskB: 'Risk 12', riskC: 'Risk 13', riskD: 'Risk 14'},
    {riskA: 'Risk 21', riskB: 'Risk 22', riskC: 'Risk 23', riskD: 'Risk 24'},
    {riskA: 'Risk 31', riskB: 'Risk 23', riskC: 'Risk 33', riskD: 'Risk 34'},
    {riskA: 'Risk 41', riskB: 'Risk 24', riskC: 'Risk 43', riskD: 'Risk 44'}];

  }

  @ViewChild('stepper') stepper: MatStepper;

    ngAfterViewInit() {
        //this.stepper.selectedIndex = 3; 
    }

}
