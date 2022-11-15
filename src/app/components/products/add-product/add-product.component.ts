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

  subcategories:SubCategories[]=[];
  public file: File |null = null;

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
    console.log(value)

    if(!this.userservice.token){
      return
    }

    let HeaderWithImage = {
      headers: new HttpHeaders({
        Authorization: 'bearer '+ this.userservice.token.access_token
      })
    };

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

    console.log(this.userservice.token)

    this.productservice.addProduct(formData, HeaderWithImage).subscribe((res:any)=>{
      console.log(res);
    });   
  }

  onChange(event:any) {
    const [file] = event.target.files
    this.file = file;
}

}
