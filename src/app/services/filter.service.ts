
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categories } from '../classes/categories';
import { Products } from '../classes/products';
import { SubCategories } from '../classes/sub-categories';

const Header = {
  headers: new HttpHeaders({
    Authorization: 'bearer '+ localStorage.getItem('token'), 
  })
};

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  products:Products[]=[];

  constructor(private http: HttpClient) { }

  search(value:string){
   return this.http.post('http://localhost:85/search',value).subscribe((res:any)=>{

    console.log(res)

      this.setProducts(res.Products);

   })
  }

  setProducts(products:Products[]){

    this.products= [];
    for (let i = 0; i < products.length; i++) { 
      let a = products[i];
      let product: Products = new Products(a.id, a.name, a.desc, a.price, a.stock,a.products_images,a.sub_categories, a.categories);

      this.products.push(product);
    }
  }



}
