import { textForTranslationFr } from './../textForTranslation/TextForTranslation';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() cityChange = new EventEmitter();
  cityParam:string;
  textForTranslationFr = textForTranslationFr;
  
  changeCityParam() {
    this.cityChange.emit(this.cityParam);
  };

  constructor() { }

  ngOnInit() {
  }

}
