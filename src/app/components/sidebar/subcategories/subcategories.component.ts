import { Router } from '@angular/router';
import { FilterService } from './../../../services/filter.service';
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

  public set subCategoryId(value: any){
    this.filterservice.subCategoryId_search = value
  }

  constructor(public productservice:ProductsService, public filterservice:FilterService, public router:Router){}

  ngOnInit(): void {
    this.productservice.requestSubCategories().subscribe((res: SubCategories[]) => {
      
      this.productservice.setSubCategories(res)

    });
    this.subcategory();

  }

  subcategory(){
  
    let filter = this.SubCategories.filter(item=> item.categories.id === this.categoryId)

    return filter;
  }

  categoryName(){
    let find = this.categories.find(item=>item.id === this.categoryId)

    return find
  }

  backToCategory(){
    this.buttonBack.emit({back:true});
  }

  listSearchById(id:any){

    if (id){
      this.subCategoryId = id;
      this.filterservice.requestSubcategoryById().subscribe((res:any)=>{

        this.filterservice.setProducts(res);
  
      });
      this.router.navigate(['/search']);
    }else{
      this.subCategoryId = null;
    }
  }

}
