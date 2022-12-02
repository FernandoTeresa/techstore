import { ProductsService } from '../../../services/products.service';
import { UserService } from '../../../services/user.service';
import { SubCategories } from '../../../classes/sub-categories';
import { Categories } from '../../../classes/categories';
import { Products } from '../../../classes/products';
import { FilterService } from '../../../services/filter.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  constructor(public filterservice:FilterService){}

  ngOnInit(){
  }

  search(value:any){
    console.log(value);

    if (value.search === ''){
      alert("cannot be empty to search")
      return;
    }
    this.filterservice.search(value);

  }

}
