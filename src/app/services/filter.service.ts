
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

  subcategoriId:any;
  rangeMin: any;
  rangeMax: any;
  stock:boolean = true;

  currentSearch = "";

  constructor(private http: HttpClient) { }

  search(value:string){
    this.products = [];
    console.log(value)

    if (value === ''){
      return this.products = [];
    }

    this.currentSearch = value;

    let data={
      search: value,
      min: this.rangeMin,
      max: this.rangeMax,
      sub_categories_id: this.subcategoriId,
      stock: this.stock
    }
   return this.http.post('http://localhost:85/search',data).subscribe((res:any)=>{

      this.setProducts(res.Products);

      console.log(res)

      //problema na api nao manda resultados

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


  getFilterStock(stock:any){
    this.stock = stock;
  }

  getFilterRange(max:any, min:any){
    this.rangeMax = max;
    this.rangeMin = min;
  }

  getFilterSubcategorie(sucategorieId:any){
    this.subcategoriId = sucategorieId;
  }


}
