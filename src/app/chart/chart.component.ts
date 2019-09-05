import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as moment from 'moment';

moment.locale('fr');

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: [
    './chart.component.css',
    '../app.component.css'
  ]
})
export class ChartComponent implements OnInit, AfterViewChecked {
  @Input() data:[]; 
  @Input() dates:[]; 
  @Input() xaxisCategories:[];
  @Input() title:string;
  @Input() dataType:string;
  @Input() chartType:string;
  @Input() dataOk:boolean;

  constructor() {
  }

  // chart 
  public lineChartData: ChartDataSets[] ;
  public lineChartLabels: Label[] ;
  public lineChartOptions: any = { legend: { display: true, labels: { fontColor: 'black' } }};
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = '';
  public lineChartPlugins = [];

  ngOnInit() {
    this.xaxisCategories;
    this.lineChartData=this.data;
    this.lineChartLabels = this.xaxisCategories;
    this.lineChartType = this.chartType;
  }
  ngAfterViewChecked(){
    this.lineChartData=this.data;
    this.lineChartType = this.chartType;
  }
}
