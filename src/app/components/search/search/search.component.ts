import { Router } from '@angular/router';
import { FilterService } from '../../../services/filter.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{ 

  constructor(public filterservice:FilterService, public router:Router){}


  ngOnInit(){
  }

  listSearch(){
    this.router.navigate(['/search']);
  }

  inputText(event:any) {
    let InputSearch = event.target.value;

    let send = {
      search:InputSearch
    }

    this.filterservice.search(send.search);

    this.listSearch();
  }
  

}
