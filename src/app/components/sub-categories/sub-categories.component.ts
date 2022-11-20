import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/classes/categories';
import { SubCategories } from 'src/app/classes/sub-categories';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent implements OnInit {

  public get categories():Categories[]{
    return this.productservice.categories;
  }

  constructor(public productservice:ProductsService ) { }

  ngOnInit(): void {

  }

  addSubCategory(value:SubCategories){
    console.log(value)
    this.productservice.addNewSubCategory(value);
    window.location.reload()
  }


}
