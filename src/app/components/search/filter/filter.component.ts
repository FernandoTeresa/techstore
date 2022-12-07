import { Component } from '@angular/core';
import { Categories } from 'src/app/classes/categories';
import { SubCategories } from 'src/app/classes/sub-categories';
import { FilterService } from 'src/app/services/filter.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

    public get categories():Categories[]{
      return this.produtservice.categories;
    }

    public get subcategories():SubCategories[]{
      return this.produtservice.subcategories;
    }

    public CategorieId:any
    public price:any

    

  constructor(public filterservice:FilterService, public produtservice:ProductsService){}

  onchangeIdCategorie(event:any){

    if (event.target.checked){
      this.CategorieId = event.target.id
    }else{
      return;
    }

  }

  onchangePrice(event:any){
    this.price= event.target.value
    console.log(event.target.value)

  }


}
