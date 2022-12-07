import { Component } from '@angular/core';

@Component({
  selector: 'app-multirange',
  templateUrl: './multirange.component.html',
  styleUrls: ['./multirange.component.css']
})
export class MultirangeComponent {


  change(event:any){

    console.log(event.target);

    // pelo id

    
  }

}
