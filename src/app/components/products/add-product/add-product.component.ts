import { UserService } from 'src/app/services/user.service';
import { SubCategories } from './../../../classes/sub-categories';
import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/classes/products';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(public productservice:ProductsService, public userservice:UserService) { }

  public file: File |null = null;

  public get subcategories():SubCategories[]{
    return this.productservice.subcategories
  }

  ngOnInit(): void {
    this.productservice.requestSubCategories();
  }

  addProduct(value:any){

    let token = localStorage.getItem('token');

    console.log(value)

    if(!token){
      return
    }


    let HeaderWithImage = {
      headers: new HttpHeaders({
        Authorization: 'bearer '+ token
      })
    };

    const formData = new FormData();


    console.log(this.file)

    if (!this.file){
      return
    }

    formData.append("images[]", this.file);
    formData.append("name",value.name);
    formData.append("desc",value.desc);
    formData.append("price",value.price);
    formData.append("stock",value.stock);
    formData.append("sub_categories_id",value.sub_categories_id);

    this.productservice.addProduct(formData, HeaderWithImage);

  }

  onChange(event:any) {
    const [file] = event.target.files
    this.file = file;
}

}
