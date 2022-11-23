import { UserService } from 'src/app/services/user.service';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { Categories } from '../../../classes/categories';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(public router:Router, public productservice:ProductsService, public userservice:UserService) { }

  public get categories():Categories[]{
    return this.productservice.categories;
  }

  public get user():User | null{
    return this.userservice.user;
  }

  ngOnInit(): void {
    if (!this.user){
      this.router.navigate(['/'])
    }
    this.productservice.requestCategories();
  }

  addcategory(value:Categories){
    let input = <HTMLInputElement>document.getElementById('categoryname')

    if(!input){
      return '';
    }

    for (let i=0;i<this.categories.length;i++){
      if(this.categories[i].name === input.value){
        alert("Cant have Category names duplicated");
        return ;
      }
    }

    this.productservice.addNewCategory(value).subscribe((res:Categories)=>{
      input.value = "";
      this.productservice.requestCategories();
    });

  }

}
