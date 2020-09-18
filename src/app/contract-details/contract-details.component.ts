import { Component, OnInit, Input } from '@angular/core';
import { Contract } from '../model/contract';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent implements OnInit {

  @Input() contractDt: Contract;
  contractType = {1: 'Loan', 2: 'Derivative'};
  contractSubType = {1: 'Mortgage Loan', 2: 'Syndicate Loan', 3: 'Bilateral Loan',
  4: 'Student Loan', 5: 'Currency Swap', 6: 'Interest Rate Swap', 7: 'Term Loan'};
  currStatus = {1: 'ScanUpload', 2: 'OCR', 3: 'Initiate', 4: 'Review', 5: 'Edit',
  6: 'AuthLegal', 7: 'AuthProgram', 8: 'AuthRisk', 9: 'AuthTreasury', 10: 'Verify', 11: 'Close'};

  constructor() { }

  ngOnInit(): void {
  }

}
