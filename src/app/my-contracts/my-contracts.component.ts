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
    this.contracts = [
      {
          "id": 1,
          "contractId": 1,
          "parentContractId": 0,
          "customContractId": null,
          "documentFileName": "1_DEUTSCHE BANK_LIBOR_SCAN_TEXT.pdf",
          "contractName": null,
          "legalEntityId": 0,
          "legalEntityName": null,
          "counterPartyId": 0,
          "counterPartyName": null,
          "contractTemplate": null,
          "contractStartDate": null,
          "contractExpiryDate": null,
          "contractTypeId": 0,
          "contractSubTypeId": 0,
          "currStatusId": 2,
          "createdOn": "2020-09-23T15:53:04.000+00:00",
          "createdBy": "smishra",
          "libor": false,
          "amendmentDoc": false
      },
      {
          "id": 2,
          "contractId": 2,
          "parentContractId": 0,
          "customContractId": null,
          "documentFileName": "1_DEUTSCHE BANK_LIBOR_SCAN.pdf",
          "contractName": null,
          "legalEntityId": 0,
          "legalEntityName": null,
          "counterPartyId": 0,
          "counterPartyName": null,
          "contractTemplate": null,
          "contractStartDate": null,
          "contractExpiryDate": null,
          "contractTypeId": 0,
          "contractSubTypeId": 0,
          "currStatusId": 1,
          "createdOn": "2020-09-23T16:08:13.000+00:00",
          "createdBy": "undefined",
          "libor": false,
          "amendmentDoc": false
      },
      {
          "id": 3,
          "contractId": 3,
          "parentContractId": 0,
          "customContractId": null,
          "documentFileName": "1_DEUTSCHE BANK_LIBOR_SCAN.pdf",
          "contractName": null,
          "legalEntityId": 0,
          "legalEntityName": null,
          "counterPartyId": 0,
          "counterPartyName": null,
          "contractTemplate": null,
          "contractStartDate": null,
          "contractExpiryDate": null,
          "contractTypeId": 0,
          "contractSubTypeId": 0,
          "currStatusId": 1,
          "createdOn": "2020-09-23T16:08:41.000+00:00",
          "createdBy": "smishra",
          "libor": false,
          "amendmentDoc": false
      },
      {
          "id": 4,
          "contractId": 4,
          "parentContractId": 0,
          "customContractId": null,
          "documentFileName": "1_DEUTSCHE BANK_LIBOR_SCAN_TEXT.pdf",
          "contractName": null,
          "legalEntityId": 0,
          "legalEntityName": null,
          "counterPartyId": 0,
          "counterPartyName": null,
          "contractTemplate": null,
          "contractStartDate": null,
          "contractExpiryDate": null,
          "contractTypeId": 0,
          "contractSubTypeId": 0,
          "currStatusId": 2,
          "createdOn": "2020-09-23T16:22:45.000+00:00",
          "createdBy": "smishra",
          "libor": false,
          "amendmentDoc": false
      }
  ];
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
