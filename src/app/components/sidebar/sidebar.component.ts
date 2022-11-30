import { SubCategories } from 'src/app/classes/sub-categories';
import { Categories } from 'src/app/classes/categories';
import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  public get categories():Categories[]{
    return this.productservice.categories;
  }

  public get SubCategories():SubCategories[]{
    return this.productservice.subcategories;
  }

  public isCollapsed = false;

  constructor(public productservice:ProductsService){}

  ngOnInit(): void {
    this.productservice.requestCategories();
    this.productservice.requestSubCategories();
  }

  changeTheme(){
    let theme = localStorage.getItem('theme')

    if(!theme){
      return;
    }

    let darkMode = JSON.parse(theme);

    if (darkMode === true){
      return 'bg-dark'
    }else{
      return 'bg-success';
    }
  }


}
