import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, DoCheck } from '@angular/core';
import { Products } from '../classes/products';
import { Filter } from '../classes/filter';


@Injectable({
  providedIn: 'root'
})
export class FilterService implements DoCheck{

  products:Products[]=[];

  subcategoriId:any = '';
  rangeMin: number = 1;
  rangeMax: number = 2500;
  stock:boolean = true;
  currentSearch: string = '';

  filter:Filter | null = null;

  constructor(private http: HttpClient) { }

  ngDoCheck(): void {
    if (!this.filter){
      return
    }

    console.log(this.filter.max);
    console.log(this.rangeMax)

    if (this.filter.max != this.rangeMax || this.filter.min != this.rangeMin || this.filter.stock != this.stock || this.filter.sub_categories_id != this.subcategoriId){
      this.request();
    }

  }


  request(){

    console.log(this.filter)
    return this.http.post('http://localhost:85/search',this.filter).subscribe((res:any)=>{

    console.log(res.Products)

    this.setProducts(res.Products);

 })

  }


  setFilter(){
    this.filter = new Filter (this.currentSearch, this.rangeMax, this.rangeMin, this.subcategoriId, this.stock);
  }

  search(value:string){
    this.products = [];

    if (value === ''){
      return this.products = [];
    }

    this.currentSearch = value;

    console.log(this.filter)

    this.setFilter();

    this.request();

  }

  setProducts(products:Products[]){

    this.products= [];
    for (let i = 0; i < products.length; i++) { 
      let a = products[i];
      let product: Products = new Products(a.id, a.name, a.desc, a.price, a.stock,a.products_images,a.sub_categories, a.categories);

      this.products.push(product);
    }
  }


  // getFilterStock(stock:any){
  //   this.stock = stock;
  // }

  // getFilterRange(max:any, min:any){
  //   this.rangeMax = max;
  //   this.rangeMin = min;
  // }

  // getFilterSubcategorie(sucategorieId:any){
  //   this.subcategoriId = sucategorieId;
  // }


}
