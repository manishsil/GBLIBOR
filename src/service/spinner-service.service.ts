import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerServiceService {

  constructor() { }

  private spinnerSubj = new Subject<boolean>();

  setspinnerSubj(obj: boolean) {
      this.spinnerSubj.next(obj);
  }

  clearspinnerSubj() {
      this.spinnerSubj.next();
  }

  getspinnerSubj(): Observable<boolean> {
      return this.spinnerSubj.asObservable();
  }
}
