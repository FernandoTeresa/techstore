import { Router } from '@angular/router';
import { SubCategories } from './../../../classes/sub-categories';
import { Categories } from './../../../classes/categories';
import { FilterService } from './../../../services/filter.service';
import { Products } from 'src/app/classes/products';
import { ProductsService } from './../../../services/products.service';
import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{


  constructor(public productservice: ProductsService, public filterservice:FilterService, public route:Router){ }

  public get productSearch():Products[]{
    return this.filterservice.products;
  }

  public get categories():Categories[]{
    return this.productservice.categories;
  }

  public get subcategories():SubCategories[]{
    return this.productservice.subcategories;
  }

  ngOnInit(): void {
    this.productservice.requestProducts();
    this.productservice.requestCategories();
    this.productservice.requestSubCategories();

  }

  getId(id:number){

    let filter = this.productSearch.find((item)=>item.id === id)

    if(!filter){
      return;
    }
    
    return filter;

  }

  images(id: number) {

    let product = this.productSearch.find(item=>item.id === id);

    if (!product?.products_images){
      return "../../../../assets/no-image.jpg"
    }
    
    return 'http://localhost:8080'+product.products_images[0].images;
  }

  numberResults(){
    let results = this.productSearch.length;
    return results;
  }

  redirect(id:number){
    this.route.navigate(['/product/'+id]);
  }







}
