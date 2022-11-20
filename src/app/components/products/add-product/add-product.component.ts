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

  // subcategories:SubCategories[]=[];
  public file: File |null = null;

  public get subcategories():SubCategories[]{
    return this.productservice.subcategories
  }

  ngOnInit(): void {
    this.productservice.requestSubCategories();

  }

  addProduct(value:any){
    console.log(value)
    console.log(this.userservice.token)
    if(!this.userservice.token){
      return
    }

    let HeaderWithImage = {
      headers: new HttpHeaders({
        Authorization: 'bearer '+ this.userservice.token.access_token
      })
    };

    console.log(HeaderWithImage)
    const formData = new FormData();

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

    console.log(formData)
  }

  onChange(event:any) {
    const [file] = event.target.files
    this.file = file;
}

}
