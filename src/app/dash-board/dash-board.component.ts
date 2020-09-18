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
  
  dashBoardObj: any=[];
  selectedDashBoard: string="portfolioManager";
  header: string;

  constructor( private service: DashboardService) {
   }
  ngOnInit(): void {
    this.dashBoardObj=this.portFolioMngObjs;
  }

  onDashboardChange(ob){
      this.selectedDashBoard = ob.value;
      this.service.getDashBoard(this.selectedDashBoard).subscribe(dt => {
        this.dashBoardObj = dt;
      });

      //Please remove the IF else logic once API ready
      if(this.selectedDashBoard==='loanTypes'){
        this.dashBoardObj=this.loanTypeDashBoardObj;
      }else if(this.selectedDashBoard==='portfolioManager'){
        this.dashBoardObj=this.portFolioMngObjs;
      }else if (this.selectedDashBoard==='state'){
        this.dashBoardObj=this.statewiseDashboardObj
      }else if (this.selectedDashBoard==='process'){
        this.dashBoardObj=this.processMatricsDashboardObj
      }else if (this.selectedDashBoard==='derivatives'){
        this.dashBoardObj=this.derivativeDashboardObj
      }
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

statewiseDashboardObj: any = [
  {
    "key":"Initiated",
    "value":"17"
  },
  {
    "key":"Reviewed",
    "value":"19"
  },
  {
    "key":"Amended",
    "value":"33"
  },
  {
    "key":"Authorized",
    "value":"27"
  },
  {
    "key":"Verified",
    "value":"39"
  },
  {
    "key":"Closed",
    "value":"47"
  }
];

processMatricsDashboardObj: any = [
  
  {
    "key":"~Avg. Initiation Time",
    "value":"1 Days"
  },
  {
    "key":"~Avg. Review Time",
    "value":"5 Days"
  },
  {
    "key":"~Avg. Amend Time",
    "value":"1 Day"
  },
  {
    "key":"~Avg. Authorization Time",
    "value":"1 Day"
  },
  {
    "key":"~Avg. Verification Time",
    "value":"2 Days"
  },
  {
    "key":"~Avg. Close Time",
    "value":"1 Day"
  },
];

derivativeDashboardObj: any = [
  
  {
    "key":"Futures",
    "value":"10"
  },
  {
    "key":"Options",
    "value":"12"
  },
  {
    "key":"Stocks",
    "value":"21"
  },
  {
    "key":"Bonds",
    "value":"17"
  },
  {
    "key":"Commodities",
    "value":"11"
  },
  {
    "key":"Interest Rates",
    "value":"9"
  },
  {
    "key":"Market Indices",
    "value":"13"
  },
  {
    "key":"Forward",
    "value":"12"
  }
];

  

}
