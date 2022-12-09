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

    public sucategorieId:any
    public priceMin: any;
    public priceMax: any;
    public stock:boolean=true;
    

  constructor(public filterservice:FilterService, public produtservice:ProductsService){}

  onchangeIdCategorie(event:any){

    if (event.target.checked){
      this.sucategorieId = event.target.id
    }else{
      return;
    }

    this.filterservice.getFilterSubcategorie(this.sucategorieId);
  }

  addItem(eventData:{min:any, max:any}) {
    this.priceMin = eventData.min;
    this.priceMax = eventData.max;

    this.filterservice.getFilterRange(this.priceMin, this.priceMax);
  }

  stockExist(event:any){
    
    if (event.target.id === "radio1"){
      this.stock = true;
    }else{
      this.stock = false;
    }

    this.filterservice.getFilterStock(this.stock);
    
  }


}
