import { Component, OnInit } from '@angular/core';
import { GbliborService } from 'src/service/gblibor.service';
import { Global } from '../model/global';
import { ContractMeta } from '../model/contractmeta';
import { Contract } from '../model/contract';

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
  contracts: Contract[];
  selectedTab = 0;
  selId: string;
  selCid: string;
  globalDataFull: Global[];
  contractMetaFull: ContractMeta[];

  constructor(private service: GbliborService) { }

  ngOnInit(): void {
    this.getGlobalData();
  }

  getGlobalData() {
    /* this.globalDataFull = [{
      regulatoryEventId: 11,
      contractType : 12,
      domainContextDictionaryId: 'ms1',
      domainContextName: 'ms',
      domainContextTypeId: 12,
      domainContextSubTypeId: 23,
      domainContextPossibleNameDefinitions: 'esf',
      domainContextPossibleValueDefinitions: 'dfg',
      phraseRule: 'gsg',
      entityRule: 'gssfg',
      referenceExamples: 'gfdg'
    },
    {
      regulatoryEventId: 22,
      contractType : 23,
      domainContextDictionaryId: 'ms2',
      domainContextName: 'This is paragraph zero. This is paragraph 1. This is paragraph 2. <p>This is paragraph 3.</p> This is paragraph four. This is paragraph five. This is paragraph six. This is paragraph seven. This is paragraph eight. This is paragraph nine. This is paragraph ten. This is paragraph eleven This is paragraph zero. This is paragraph 1. This is paragraph 2. <p>This is paragraph 3.</p> This is paragraph four. This is paragraph five. This is paragraph six. This is paragraph seven. This is paragraph eight. This is paragraph nine. This is paragraph ten. This is paragraph eleven',
      domainContextTypeId: 12,
      domainContextSubTypeId: 23,
      domainContextPossibleNameDefinitions: 'esf2',
      domainContextPossibleValueDefinitions: 'dfg2',
      phraseRule: 'gsg2',
      entityRule: 'gssfg2',
      referenceExamples: 'gfdg2'
    }];
    this.selId = this.globalDataFull[0].domainContextDictionaryId;
    this.globalData = this.globalDataFull[0]; */
    this.service.getGlobalData().subscribe(dt => {
      this.globalData = dt;
      this.selId = this.globalDataFull[0].domainContextDictionaryId;
      this.globalData = this.globalDataFull[0];
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
      this.contractMetaFull = dt.listdocumentMetaData;
      this.selCid = this.contractMetaFull[0].domainContextDictionaryId;
      this.contractMeta = this.contractMetaFull[0];
    });
  }

  getAllContracts() {
    this.service.getAllContracts().subscribe(dt => {
      this.contracts = dt;
    });
  }

  loadGlobalData() {
    this.globalData = this.globalDataFull.filter(ele => ele.domainContextDictionaryId === this.selId)[0];
  }

  loadContractData() {
    this.contractMeta = this.contractMetaFull.filter(ele => ele.domainContextDictionaryId === this.selId)[0];
  }

  laodTabDetails($event: any){
    if ($event.index === 0) {
      this.getGlobalData();
    } else if ($event.index === 1) {
      this.getAllContracts();
    } else if ($event.index === 2) {

    }
  }

}
