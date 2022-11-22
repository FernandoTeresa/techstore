import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { Categories } from './../../classes/categories';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(public router:Router, public productservice:ProductsService) { }

  public get categories():Categories[]{
    return this.productservice.categories;
  }

  ngOnInit(): void {
    this.productservice.requestCategories();
  }

  addcategory(value:Categories){
    let input = <HTMLInputElement>document.getElementById('categoryname')

    if(!input){
      return;
    }
    this.productservice.addNewCategory(value);
    input.value = "";
    alert("Categorie added");
  }

}
