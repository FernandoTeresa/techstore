import { SubCategories } from './../../../classes/sub-categories';
import { Categories } from './../../../classes/categories';
import { FilterService } from './../../../services/filter.service';
import { Products } from 'src/app/classes/products';
import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  constructor(public productservice: ProductsService, public filterservice:FilterService){ }

  public get productSearch():Products[]{
    return this.filterservice.products;
  }

  public get categories():Categories[]{
    return this.productservice.categories;
  }

  public get subcategories():SubCategories[]{
    return this.productservice.subcategories;
  }

    searchproduct:Products[]=[]

  ngOnInit(): void {
    this.productservice.requestCategories();
    this.productservice.requestSubCategories();
  }


  //fazer com o onchange para fazer search onthefly


  getId(id:number){
    let filter = this.productSearch.filter((item)=>item.id === id)
    this.searchproduct = filter;

    console.log(this.searchproduct)
  }


}
