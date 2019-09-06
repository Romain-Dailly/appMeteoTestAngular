import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import { textForTranslationFr } from '../textForTranslation/TextForTranslation';
import * as moment from 'moment';
import {Observable} from 'rxjs';

moment.locale('fr');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css', 
    '../app.component.css'
]
})
export class HomeComponent implements OnInit {
  constructor(private fetchService:FetchDataService) { }

  date = moment(Date.now()).format('LL');
  
  // Param from search for fetch
  cityParam :string;

  // Get from data after fetch
  private dataWeatherDays;
  city: string;
  country: string;
  dataWeatherFilteredPerDay:any = [];
  data:[]=[]
  dataForChartTemp:[]=[];
  dataForChartHumidity:[]=[];
  dataForChartPressure:[]=[];
  axisCategories:[]=[];
  graphTitle:string='';
  dataType:string='temp';
  chartType:string='line';
  dataOk:boolean=false;
  textForTranslationFr = textForTranslationFr;
  // Wait for fetch to display days component
  fetchDone:boolean=false;

  setFetchdone(){
    this.fetchDone = !this.fetchDone;
    this.dataOk = !this.dataOk;
    this.cityParam='';
  };

  // Method to come back to city choice
  changeCity(){
    this.setFetchdone(); 
    this.dataWeatherFilteredPerDay !== [] ? this.dataWeatherFilteredPerDay = [] : null;
  };

  // Method to toggle chartType
  toggleChartType(type:string):void {
    this.chartType = type;
  };

  // Date of day
  getDateOfDays(day:number){ return moment(Date.now()).add(day, 'd').format('LL')};
  dateOfDays = [this.getDateOfDays(1),this.getDateOfDays(2),this.getDateOfDays(3),this.getDateOfDays(4)];

  // Get differnts types of data
  setDataForChart(property):any{
    return this.dataWeatherFilteredPerDay.map((dat:any[], i) => {
      return {
        label: i=== 0 ? 
        `${textForTranslationFr.nameOfDataFirstDayTomorrow}, ${this.dateOfDays[i]}`:
        this.dateOfDays[i], 
        data:dat.map(da=> {return property === this.dataForChartTemp ? da.main.temp : property === this.dataForChartHumidity ? da.main.humidity:da.main.pressure})
        }
      });
  };

  // Set data for the chart regarding the datatype
  setDataType(type:string){
    this.dataType= type;
    this.dataType === 'temp' ?
   (this.graphTitle = textForTranslationFr.graphTitleTemp,
    this.data = this.setDataForChart(this.dataForChartTemp)):
    this.dataType==='humidity'?
    (this.graphTitle= textForTranslationFr.graphTitleHumidity,
    this.data = this.setDataForChart(this.dataForChartHumidity)):
    (this.graphTitle= textForTranslationFr.graphTitlePressure,
    this.data = this.setDataForChart(this.dataForChartPressure));
  };

  // Set Data per days in an array
  setDataForDays(data){
    for (let i =1; i <=4; i++){
      this.filterData(data, this.getDateOfDays(i));
      i === 4 && this.setFetchdone();  
    };
    this.dataType === 'temp' ?
    this.data = this.setDataForChart(this.dataForChartTemp):
    this.dataType==='humidity'?
    this.data = this.setDataForChart(this.dataForChartHumidity):
    this.data = this.setDataForChart(this.dataForChartPressure);
      this.axisCategories = this.dataWeatherFilteredPerDay[0].map(dat=>{return moment.unix(dat.dt).format('LT')})
  }
  filterData(data, dateOfDay) { 
    this.dataWeatherFilteredPerDay = [...this.dataWeatherFilteredPerDay, 
    data.list.filter(item => 
    moment.unix(item.dt).format('LL') === dateOfDay)]
  };

  ngOnInit() {
  }

  getWeather(type :string) { 
    this.setDataType('temp');
    type === 'city' ?
      this.fetchService.getWeatherWithCity(this.cityParam).subscribe(
        data => { 
          this.dataWeatherDays = data;
          this.setDataForDays(data);
          this.city = this.dataWeatherDays.city.name;
          this.country = this.dataWeatherDays.city.country;
        },
        err => console.error(err),
        () => console.log('done loading weatherData from city')
      ) :
      navigator.geolocation.getCurrentPosition(result =>
        this.fetchService.getWeatherWithGeolocation(result.coords.latitude, result.coords.longitude).subscribe(
          data => {             
            this.dataWeatherDays = data;
            this.setDataForDays(data);
            this.city = this.dataWeatherDays.city.name;
            this.country = this.dataWeatherDays.city.country;
          },
          err => console.error(err),
          () => console.log('done loading weatherData from geolocation')
        )
      );
  };
};
