import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/service/login.service';
import { GbliborService } from 'src/service/gblibor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private loginService: LoginService, private service: GbliborService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.username && this.password){
     this.service.getUserDetails(this.username).subscribe(dt => {
      setTimeout(() => {
        this.loginService.setUserDetails(dt);
       });
      this.router.navigate(['/repapering']);
     });
    } else {
      alert('Invalid credentials');
    }
  }

}
