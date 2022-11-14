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

  categories:Categories[]=[];

  constructor(public productservice:ProductsService ) { }

  ngOnInit(): void {

    this.productservice.getCategories().subscribe((res:Categories[])=>{

      for (let i=0;i<res.length;i++){
        let array = res[i];
        let category = new Categories(array.id, array.name);
        this.categories.push(category);
        
      }

    })
  }

  addSubCategory(value:SubCategories){
    console.log(value)
    this.productservice.addNewSubCategory(value);
    window.location.reload()
  }


}
