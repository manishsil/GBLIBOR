import { Component, OnInit } from '@angular/core';
import { GbliborService } from 'src/service/gblibor.service';
import { Global } from '../model/global';
import { ContractMeta } from '../model/contractmeta';

@Component({
  selector: 'app-analytics-manager',
  templateUrl: './analytics-manager.component.html',
  styleUrls: ['./analytics-manager.component.css']
})
export class AnalyticsManagerComponent implements OnInit {

  global = false;
  contract = false;
  contractId: number;
  globalData: Global;
  contractMeta: ContractMeta;

  constructor(private service: GbliborService) { }

  ngOnInit(): void {
  }

  getGlobalData() {
  /*   this.globalData = {
      regulatoryEventId: 11,
      contractType : 12,
      domainContextDictionaryId: 'ms',
      domainContextName: 'ms',
      domainContextTypeId: 12,
      domainContextSubTypeId: 23,
      domainContextPossibleNameDefinitions: 'esf',
      domainContextPossibleValueDefinitions: 'dfg',
      phraseRule: 'gsg',
      entityRule: 'gssfg',
      referenceExamples: 'gfdg'
    }; */
    this.service.getGlobalData().subscribe(dt => {
      this.globalData = dt;
    });

  }

  loadContractMetaData() {
  /*   console.log(this.contractId);
    this.contractMeta = {
      headerName: 'string',
      headerPageNo: 123,
      headerTextContent: 'string',
      headerParagraphIndex: 122,
      headerFontName: 'string',
      headerFontSize: 'string',
      startLocationX: 467,
      startLocationY: 799,
      endLocationX: 2343,
      endLocationY: 778
    }; */
    this.service.getContractMetaData(this.contractId).subscribe(dt => {
      this.contractMeta = dt;
    });
  }

}
