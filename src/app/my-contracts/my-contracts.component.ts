import { Component, OnInit } from '@angular/core';
import { GbliborService } from 'src/service/gblibor.service';
import { Contract } from '../model/contract';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-my-contracts',
  templateUrl: './my-contracts.component.html',
  styleUrls: ['./my-contracts.component.css']
})
export class MyContractsComponent implements OnInit {

  contracts: Contract[];
  currStatus = {1: 'ScanUpload', 2: 'OCR', 3: 'Initiate', 4: 'Review', 5: 'Edit',
  6: 'AuthLegal', 7: 'AuthProgram', 8: 'AuthRisk', 9: 'AuthTreasury', 10: 'Verify', 11: 'Close'};

  constructor(private service: GbliborService, private router: Router) { }

  ngOnInit(): void {
    this.getContracts();
  }

  getContracts(): void {
    this.service.getAllContracts().subscribe(dt => {
      this.contracts = dt;
    });
  }

  navigate(contract: Contract) {
    console.log('nav');
    const navigationExtras: NavigationExtras = {
      queryParams: {contractId: contract.contractId, currStatus: contract.currStatusId}
    };
    this.router.navigate(['/repapering'], navigationExtras);
  }

}
