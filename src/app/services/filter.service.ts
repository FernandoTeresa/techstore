import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../classes/products';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

const Header = {
  headers: new HttpHeaders({
    Authorization: 'bearer '+ localStorage.getItem('token'), 
  })
};

@Injectable({
  providedIn: 'root'
})
export class FilterService{

  products:Products[]=[];

  subcategoriId:any = '';
  rangeMin: number = 1;
  rangeMax: number = 2500;
  stock:boolean = true;

  currentSearch: string = '';

  constructor(private http: HttpClient) { }


  request(data:any){

    console.log(data)
    return this.http.post('http://localhost:85/search',data).subscribe((res:any)=>{

    console.log(res.Products)

    this.setProducts(res.Products);

 })


 //ver tutorial do ngDoCheck, para ver do filtro
 //https://www.youtube.com/watch?v=8PysoU6seeM


  }


  search(value:string){
    this.products = [];

    if (value === ''){
      return this.products = [];
    }

    this.currentSearch = value;

    let data={
      search: value,
      max: this.rangeMax,
      min: this.rangeMin,
      sub_categories_id: this.subcategoriId,
      stock: this.stock
    }


    this.request(data)

   
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
