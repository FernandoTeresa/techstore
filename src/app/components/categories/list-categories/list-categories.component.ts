import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categories } from 'src/app/classes/categories';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent  implements OnInit{
  
  constructor(public router:Router, public productservice:ProductsService) { }

  public get categories():Categories[]{
    return this.productservice.categories;
  }

  ngOnInit(): void {
    this.productservice.getCategories();
    this.productservice.requestCategories().subscribe((res: Categories[]) => {
      
      this.productservice.setCategories(res)

    });
  }

}
