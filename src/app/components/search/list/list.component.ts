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


  ngOnInit(): void {
    this.productservice.requestProducts();
    this.productservice.requestCategories();
    this.productservice.requestSubCategories();
  }

  //fazer com o onchange para fazer search onthefly

  getId(id:number){
    let filter = this.filterservice.products.find((item)=>item.id === id)

    if(!filter){
      return;
    }
    
    return filter;

  }

  images(id: number) {

    let product = this.filterservice.products.find(item=>item.id === id);

    if (!product?.products_images){
      return "../../../../assets/no-image.jpg"
    }
    
    console.log(product)
    return 'http://localhost:8080'+product.products_images[0].images;
  
    
  }


}
