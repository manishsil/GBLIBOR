import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';

interface Dashboard {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  dashboards: Dashboard[] = [
    {value: 'portfolioManager', viewValue: 'Portfolio Managers'},
    {value: 'loanTypes', viewValue: 'Loan Types'},
    {value: 'derivatives', viewValue: 'Derivatives Types'},
    {value: 'state', viewValue: 'State Wise'},
    {value: 'process', viewValue: 'Process Matrics'}
  ];
  constructor( private service: DashboardService) {
   }
   dashBoardObj: any=[];

  ngOnInit(): void {
  }

  onDashboardChange(ob){
      let selectedDashBoard = ob.value;
      this.service.getDashBoard(selectedDashBoard).subscribe(dt => {
        this.dashBoardObj = dt;
      });
  }

  portFolioMngObjs: any = [
  {
    "key":"Loan Contracts",
    "value":"10"
  },
  {
    "key":"Bond Contracts",
    "value":"20"
  },
  {
    "key":"OTC Contracts",
    "value":"30"
  },
  {
    "key":"FRN Contracts",
    "value":"20"
  },
  {
    "key":"ETD Contracts",
    "value":"20"
  }
];

loanTypeDashBoardObj: any = [
  {
    "key":"Home Loan",
    "value":"10"
  },
  {
    "key":"Syndicate Loan",
    "value":"20"
  },
  {
    "key":"Student Loan",
    "value":"60"
  },
  {
    "key":"Bilateral Loan",
    "value":"70"
  },
  {
    "key":"Mortgage Loan",
    "value":"80"
  },
];


  

}
