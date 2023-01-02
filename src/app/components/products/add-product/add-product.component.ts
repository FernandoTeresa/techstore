import { UserService } from 'src/app/services/user.service';
import { SubCategories } from './../../../classes/sub-categories';
import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/classes/products';
import { HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(public productservice:ProductsService, public userservice:UserService, public router:Router) { }

  public file: File |null = null;

  public get subcategories():SubCategories[]{
    return this.productservice.subcategories
  }

  public get user():User | null{
    return this.userservice.user;
  }

  ngOnInit(): void {
    if (!this.user){
      this.router.navigate(['/'])
      return
    }
    this.productservice.requestSubCategories().subscribe((res: SubCategories[]) => {
      
      this.productservice.setSubCategories(res)

    });
  }

  addProduct(value:any){

    let token = localStorage.getItem('token');

    if(!token){
      return
    }


    let HeaderWithImage = {
      headers: new HttpHeaders({
        Authorization: 'bearer '+ token
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

    this.productservice.addProduct(formData, HeaderWithImage).subscribe((res:any)=>{
     
    });

  }

  onChange(event:any) {
    const [file] = event.target.files
    this.file = file;
}

}
