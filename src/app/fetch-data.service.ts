import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getWeatherWithCity(city:string) {
    return this.http.get(`${environment.fetchUrl}q=${city}&APPID=${environment.key}&units=metric&lang=fr`);
  };
  
  getWeatherWithGeolocation(lat:number, lon:number) {
    return this.http.get(`${environment.fetchUrl}lat=${lat}&lon=${lon}&APPID=${environment.key}&units=metric&lang=fr`);
  };
};