import { Component, OnInit } from '@angular/core';
import { GbliborService } from 'src/service/gblibor.service';
import { Contract } from '../model/contract';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  pieChartLabels: string[] = ['ScanUpload', 'OCR', 'Initiate', 'Review', 'Edit', 'AuthLegal'];
  pieChartData: number[] = [0, 0, 0 , 0, 0, 0];
  pieChartType = 'pie';
  showChart = false;

  contracts: Contract[];

  constructor(private service: GbliborService) { }

  ngOnInit(): void {
    this.getContracts();
  }

  getContracts(): void {
    this.showChart = false;
    this.service.getAllContracts().subscribe(dt => {
      this.contracts = dt;
      this.contracts.forEach(ele => {
        if (ele.currStatusId === 1){
          this.pieChartData[0] += 1 ;
        } else if (ele.currStatusId === 2){
          this.pieChartData[1] += 1;
        } else if (ele.currStatusId === 3){
          this.pieChartData[2] += 1;
        } else if (ele.currStatusId === 4){
          this.pieChartData[3] += 1;
        } else if (ele.currStatusId === 5){
          this.pieChartData[4] += 1;
        } else if (ele.currStatusId === 6){
          this.pieChartData[5] += 1;
        }
      });
      this.showChart = true;
    });
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
 
  public chartHovered(e: any): void {
    console.log(e);
  }

}
