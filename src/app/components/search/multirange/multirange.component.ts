import { Component, Output, EventEmitter } from '@angular/core';
import { Options } from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-multirange',
  templateUrl: './multirange.component.html',
  styleUrls: ['./multirange.component.css']
})
export class MultirangeComponent {

  @Output() newItemEvent = new EventEmitter<any>();

  value: number = 1;
  highValue: number = 2500;
  options: Options = {
    floor: 1,
    ceil: 2500
  };


  addNewItem(){
    this.newItemEvent.emit({min:this.value, max:this.highValue});
  }





  

}
