import { SubCategories } from './../../../classes/sub-categories';
import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/classes/products';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(public productservice:ProductsService) { }

  subcategories:SubCategories[]=[];
  file: File |null = null;

  ngOnInit(): void {

    this.productservice.getSubCategories().subscribe((res:SubCategories[])=>{

      for (let i=0;i<res.length;i++){
        let array = res[i];
        let subcategorie = new SubCategories(array.id, array.name, array.categories);
        this.subcategories.push(subcategorie);
      }

    })

  }

  addProduct(value:any){

    this.productservice.addProduct(value);   

  }

}
