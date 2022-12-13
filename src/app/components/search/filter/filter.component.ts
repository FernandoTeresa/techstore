import { Component, DoCheck } from '@angular/core';
import { Categories } from 'src/app/classes/categories';
import { Filter } from 'src/app/classes/filter';
import { SubCategories } from 'src/app/classes/sub-categories';
import { FilterService } from 'src/app/services/filter.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent{

    public get categories():Categories[]{
      return this.produtservice.categories;
    }

    public get subcategories():SubCategories[]{
      return this.produtservice.subcategories;
    }

  public set filter(value: Filter | null) {
    this.filterservice.filter = value;
  }

    public subcategorieId:any

    public stock:boolean=true;
    

  constructor(public filterservice:FilterService, public produtservice:ProductsService){}

  onchangeIdCategorie(event:any){

    if (event.target.checked){
      this.subcategorieId = event.target.id
    }else{
      this.subcategorieId = '';
    }

    if (!this.filter){
      return;
    }

    this.filter.sub_categories_id = this.subcategorieId

    //this.filterservice.getFilterSubcategorie(this.subcategorieId);
  }

  addItem(eventData:{min:any, max:any}) {
    if (!this.filter){
      return;
    }

    this.filter.max = eventData.max;
    this.filter.min = eventData.min;

    console.log(eventData)

    //this.filterservice.getFilterRange(eventData.max, eventData.min);
  }

  stockExist(event:any){
    
    if (event.target.id === "radio1"){
      this.stock = true;
    }else{
      this.stock = false;
    }

    if (!this.filter){
      return;
    }

    this.filter.stock = this.stock;

    //this.filterservice.getFilterStock(this.stock);
  }


}
