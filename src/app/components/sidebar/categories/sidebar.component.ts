import { ThemeService } from './../../../services/theme.service';
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

  categoryId:any;

  constructor(public productservice:ProductsService, public themeservice:ThemeService){}

  ngOnInit(): void {
    this.productservice.requestCategories();
  }

  category(id:number){
    this.categoryId = id;

    let x = <HTMLElement>document.getElementById('category');

    let y = <HTMLElement>document.getElementById('subcategory');

    x.hidden = true;
    
    y.hidden = false;
  }

  backToCategories(eventData:{back:any}){
    let x = <HTMLElement>document.getElementById('category');

    let y = <HTMLElement>document.getElementById('subcategory');

    if(eventData.back === true){
      x.hidden = false
      y.hidden = true
    }
  }

  closeSidenav(){
    let sidenav = <HTMLElement>document.getElementById("mySidenav");

    sidenav.style.width = '0';
  }

}
