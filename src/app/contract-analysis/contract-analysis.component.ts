import { Component, OnInit,ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexYAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-contract-analysis',
  templateUrl: './contract-analysis.component.html',
  styleUrls: ['./contract-analysis.component.css']
})
export class ContractAnalysisComponent implements OnInit {
  //https://apexcharts.com/docs/angular-charts/
  
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions1: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Valuation",
          data: [10, 41]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      
      title: {
        text: "LIBOR vs Non-LIBOR contract analysis"
      },
      xaxis: {
        categories: [
          "LIBOR",
          "Non-LIBOR"
        ]
      }
    };
    
    this.chartOptions1 = {
      series: [
        {
          name: "Valuation",
          data: [19800000, 46433461]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "LIBOR vs Non-LIBOR contract analysis"
      },
      xaxis: {
        categories: [
          "LIBOR",
          "Non-LIBOR"
        ]
      }
    };


  }

  ngOnInit(): void {
  }

  

}
