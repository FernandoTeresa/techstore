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

  ngOnInit(): void {
  }

  addcategory(value:Categories){
    console.log(value)
    this.productservice.addNewCategory(value);
  }

}
