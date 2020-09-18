import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  private userDetails = new Subject<any>();

  setUserDetails(obj: any) {
      this.userDetails.next(obj);
  }

  clearUserDetails() {
      this.userDetails.next();
  }

  getUserDetails(): Observable<any> {
      return this.userDetails.asObservable();
  }
}
