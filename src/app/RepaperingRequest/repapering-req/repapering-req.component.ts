import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-repapering-req',
  templateUrl: './repapering-req.component.html',
  styleUrls: ['./repapering-req.component.css']
})
export class RepaperingReqComponent implements OnInit {

  stepIndex: number;
  selectedTab: number;
  isInitated: boolean;
  fileToUploaded: {name: string, type: string, byteArr: any};
  documentDt: {contractId: string, type: string, customerId: string, subtype: string, libor: boolean, state: string};
  analysedDt: {risk: any, financial: any, collateral: any, workHistory: any, clientOutreach: any, approvals: any, verify: any};

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fileToUploaded = {name: '', type: '', byteArr: ''};
    this.documentDt = {contractId: '', type: '', customerId: '', subtype: '', libor: false, state: ''};
    this.analysedDt = {risk: [], financial: [], collateral: [], workHistory: [], clientOutreach: [], approvals: [], verify: []};
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
    this.selectedTab = 0;

    this.analysedDt.risk =
    [{riskA: 'Risk 11', riskB: 'Risk 12', riskC: 'Risk 13', riskD: 'Risk 14'},
    {riskA: 'Risk 21', riskB: 'Risk 22', riskC: 'Risk 23', riskD: 'Risk 24'},
    {riskA: 'Risk 31', riskB: 'Risk 23', riskC: 'Risk 33', riskD: 'Risk 34'},
    {riskA: 'Risk 41', riskB: 'Risk 24', riskC: 'Risk 43', riskD: 'Risk 44'}];
  }

}
