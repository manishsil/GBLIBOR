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
  contractSubType = {1: 'Mortgage Loan', 2: 'Syndicate Loan', 3: 'Bilateral Loan', 4: 'Student Loan', 5: 'Currency Swap', 6: 'Interest Rate Swap'};

  constructor() { }

  ngOnInit(): void {
  }

}
