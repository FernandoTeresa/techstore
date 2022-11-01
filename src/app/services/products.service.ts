import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '../classes/products';
import { SubCategories } from '../classes/sub-categories';
import { User } from '../classes/user';
import { UserService } from './user.service';

const Header = {
  headers: new HttpHeaders({
    Authorization: 'bearer '+ localStorage.getItem('token'), 
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  user: User[] = [];
  products: Products[] = [];
  sub_categories: SubCategories[] = [];

  constructor(private http: HttpClient, private router: Router, public userservice:UserService) { }


  requestProducts(){

    this.http.get<Products[]>('http://localhost:85/products').subscribe((res: Products[]) => {

      this.products= [];

      for (let i = 0; i < res.length; i++) { 
        let a = res[i];
        console.log(a.id)
        let product: Products = new Products(a.id, a.name, a.desc, a.price, a.stock,a.sub_categories);
        this.products.push(product);  
      }

      console.log(this.sub_categories)
    });

  }


  updateProduct(value:Products, productId:number){

    this.http.put<Products>('http://localhost:85/product/update/'+ productId , value, Header).subscribe((res:Products)=>{    

    },(err) => {
      switch(err.status){
        case 400:
          alert('ERROR!! Bad Request');
          break;
        case 401:
          alert('ERROR!! Unauthorized');
          break;
        case 403:
          alert('ERROR!! Forbidden');
          break;
        case 404:
          alert('ERROR!! Not Found');
          break;
        case 500:
          alert('ERROR!! Server Error');
          break;
        default:
          alert ('Unknow Error!!');
          break;
      }
    })
  }

  uploadProduct(value: File){
    
  }

  
  



}
