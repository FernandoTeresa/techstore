import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categories } from 'src/app/classes/categories';
import { SubCategories } from 'src/app/classes/sub-categories';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit{

  @Input() categoryId:any;
  @Output() buttonBack = new EventEmitter<any>();

  public get SubCategories():SubCategories[]{
    return this.productservice.subcategories;
  }

  public get categories():Categories[]{
    return this.productservice.categories;
  }

  constructor(public productservice:ProductsService){}

  ngOnInit(): void {
    this.productservice.requestSubCategories();
    this.subcategory();

  }

  subcategory(){
    let find = this.SubCategories.find(item=> item.categories.id === this.categoryId)

    return find;
  }

  backToCategory(){
    this.buttonBack.emit({back:true});

  }

}
