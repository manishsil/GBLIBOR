import { Component, OnInit, OnDestroy } from '@angular/core';
import { Approval } from '../model/approval';
import { GbliborService } from 'src/service/gblibor.service';
import { LoginService } from 'src/service/login.service';
import { User } from '../model/user';
import { Subscription } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-my-approvals',
  templateUrl: './my-approvals.component.html',
  styleUrls: ['./my-approvals.component.css']
})
export class MyApprovalsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  approvalsDt: Approval[];
  risk: Approval[] = [];
  libor: Approval[] = [];
  legal: Approval[] = [];
  treasury: Approval[] = [];
  userDetails: User;

  constructor(private service: GbliborService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
   /*  this.approvalsDt = [{contractId: 123,state: 'Autorize', approver: 'Abc Xyz', groupName: 'TREASURY-MGMT', responsibility: 'Risk Management', comments: 'ok', createdOn: '02/02/2020', updatedOn: '02/04/2020'},
    {contractId: 123,state: 'Autorize', approver: 'Abc Xyz', groupName: 'LIBOR-PRO-MGMT', responsibility: 'Risk Management', comments: 'ok', createdOn: '02/02/2020', updatedOn: '02/04/2020'},
    {contractId: 123,state: 'Autorize', approver: 'Abc Xyz', groupName: 'LEGAL-MGMT', responsibility: 'Risk Management', comments: 'ok', createdOn: '02/02/2020', updatedOn: '02/04/2020'},
      {contractId: 123,state: 'Autorize', approver: 'Abc Xyz', groupName: 'RISK-MGMT', responsibility: 'Risk Management', comments: 'ok', createdOn: '02/02/2020', updatedOn: '02/04/2020'}];  
  
    this.approvalsDt .forEach(el => {
      if (el.groupName === 'LIBOR-PRO-MGMT') {
        this.libor.push(el);
      } else if (el.groupName === 'RISK-MGMT') {
        this.risk.push(el);
      } else if (el.groupName === 'LEGAL-MGMT') {
        this.legal.push(el);
      } else if (el.groupName === 'TREASURY-MGMT') {
        this.treasury.push(el);
      }
    }); */
    this.subscription = this.loginService.getUserDetails().subscribe(data => {
      this.userDetails = data;
      this.service.getMyApprovalsData(this.userDetails.loginId).subscribe(dt => {
        this.approvalsDt = dt;
        this.approvalsDt .forEach(el => {
          if (el.groupName === 'LIBOR-PRO-MGMT') {
            this.libor.push(el);
          } else if (el.groupName === 'RISK-MGMT') {
            this.risk.push(el);
          } else if (el.groupName === 'LEGAL-MGMT') {
            this.legal.push(el);
          } else if (el.groupName === 'TREASURY-MGMT') {
            this.treasury.push(el);
          }
        });
      });
    });
  }

  navWorkflow(contractId: number) {
    const navigationExtras: NavigationExtras = {
      queryParams: {cId: contractId}
    };
    this.router.navigate(['/repapering'], navigationExtras);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
