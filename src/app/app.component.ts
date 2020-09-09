import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  //https://codepen.io/ondrejsvestka/pen/gWPpPo
  title = 'GBLIBOR';
  username = '';
  subscription: Subscription;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.subscription = this.loginService.getUserDetails().subscribe(dt => {
      this.username = dt.firstName + ' ' + dt.lastName;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
