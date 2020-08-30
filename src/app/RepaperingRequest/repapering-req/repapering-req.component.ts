import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-repapering-req',
  templateUrl: './repapering-req.component.html',
  styleUrls: ['./repapering-req.component.css']
})
export class RepaperingReqComponent implements OnInit,AfterViewInit {

  constructor() { }
  currentStep: number =3;
  processing: boolean= true;
  pdfSrc: string="https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"
  ngOnInit(): void {
    
  }

  @ViewChild('stepper') stepper: MatStepper;

    ngAfterViewInit() {
        //this.stepper.selectedIndex = 3; 
    }

}
