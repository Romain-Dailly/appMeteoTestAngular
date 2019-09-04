import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor(private http:HttpClient) { }

  bgColor:string='';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getWeatherWithCity(city:string) {
    return this.http.get(`${environment.fetchUrl}q=${city}&APPID=${environment.key}&units=metric&lang=fr`);
  };
  
  getWeatherWithGeolocation(lat:number, lon:number) {
    return this.http.get(`${environment.fetchUrl}lat=${lat}&lon=${lon}&APPID=${environment.key}&units=metric&lang=fr`);
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
