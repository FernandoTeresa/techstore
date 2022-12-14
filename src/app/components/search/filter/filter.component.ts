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

    public subcategoryId:any = ''
    public max:any = 2500
    public min:any = 1
    public stock:boolean=true;
    public search:any = '';

    private changeDetected:boolean = false;

    public get filter():Filter | null{
      return this.filterservice.filter;
    }
    

  constructor(public filterservice:FilterService, public produtservice:ProductsService){}

  ngOnInit(){
    this.filterservice.setFilter();
    this.filterservice.request();
  }

  ngDoCheck(){

    if(!this.filter){
      return
    }

    if (this.filter.search !== this.search){
      this.changeDetected = true;
      this.search = this.filter.search;
    }

    if (this.filter.max !== this.max){
      this.changeDetected=true;
      this.max = this.filter.max
    }

    if (this.filter.min !== this.min){
      this.changeDetected=true;
      this.min = this.filter.min
    }

    if (this.filter.stock !== this.stock){
      this.changeDetected=true;
      this.stock = this.filter.stock
    }

    if (this.filter.sub_categories_id !== this.subcategoryId){

      //PROBLEMA NO SEARCH COM AS CATEGORIAS

      this.changeDetected=true;
      this.subcategoryId = this.filter.sub_categories_id
    }

    if (this.changeDetected){
      this.filterservice.request();
    }

    this.changeDetected = false;

  }

  onchangeIdCategorie(event:any){

    if (event.target.checked){
      this.subcategoryId = event.target.id
    }else{
      this.subcategoryId = '';
    }

    this.filterservice.getFilterSubcategorie(this.subcategoryId);
  }

  addItem(eventData:{min:any, max:any}) {
    this.max = eventData.max;
    this.min = eventData.min;

    this.filterservice.getFilterRange(eventData.max, eventData.min);
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
