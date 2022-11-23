import { SubCategories } from 'src/app/classes/sub-categories';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categories } from 'src/app/classes/categories';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list-sub-categories',
  templateUrl: './list-sub-categories.component.html',
  styleUrls: ['./list-sub-categories.component.css']
})
export class ListSubCategoriesComponent implements OnInit{

  public get categories():Categories[]{
    return this.productservice.categories;
  }

  public get subcategories():SubCategories[]{
    return this.productservice.subcategories;
  }

  public optionId:any |null = null;

  constructor(public router:Router, public productservice:ProductsService) { }

  ngOnInit(): void {
    this.productservice.requestSubCategories();
    this.productservice.requestCategories();

  }

  onChange(event:any){
    let id =event.target.value;
    this.optionId = id;
  }

  listSubCategory(){
    if(!this.optionId){
      return [];
    }

    let find = this.subcategories.filter((item)=>item.categories.id == this.optionId);

    if(!find.length){
      return [];
    }


    return find

  }

  


}
