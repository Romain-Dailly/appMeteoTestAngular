import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {Observable} from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor(private http:HttpClient) { }

  bgColor:string='';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private key:string='249faba785f8315b1a32a540f85af0ea';
  private fetchUrl=`http://api.openweathermap.org/data/2.5/forecast?`;

  getWeatherWithCity(city:string) {
    return this.http.get(`${this.fetchUrl}q=${city}&APPID=${this.key}&units=metric&lang=fr`);
  };
  
  getWeatherWithGeolocation(lat:number, lon:number) {
    return this.http.get(`${this.fetchUrl}lat=${lat}&lon=${lon}&APPID=${this.key}&units=metric&lang=fr`);
  };

  getBg(color:string) {
    return color;
  };

  setBg(param:string):void {
    param === 'temp' ?
    this.bgColor = 'rgb(255, 236, 179)':
    param === 'humidité'?
    this.bgColor = 'rgb(230, 230, 255)':
    this.bgColor = 'rgb(242, 242, 242)';
  }

}
