import { Component, OnInit } from '@angular/core';
import { SpinnerServiceService } from 'src/service/spinner-service.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  showSpinner = false;
  constructor(private spinnerService: SpinnerServiceService) { }

  ngOnInit(): void {
    this.spinnerService.getspinnerSubj().subscribe(val => {
      this.showSpinner = val;
    });
  }

}
