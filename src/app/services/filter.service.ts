import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, DoCheck } from '@angular/core';
import { Products } from '../classes/products';
import { Filter } from '../classes/filter';


@Injectable({
  providedIn: 'root'
})
export class FilterService{

  products:Products[]=[];


  subcategoryId:any = '';
  rangeMin: number = 1;
  rangeMax: number = 2500;
  stock:boolean = true;
  currentSearch: string = '';

  filter:Filter | null = null;

  subCategoryId_search:any

  constructor(private http: HttpClient) { }

  request(){

    this.setFilter();

    return this.http.post('http://localhost:85/search',this.filter).subscribe((res:any)=>{

        this.setProducts(res.Products);
    })

  }

  requestSubcategoryById(){

    return this.http.get<Products[]>('http://localhost:85/subcategory/'+this.subCategoryId_search).subscribe((res:any)=>{

      this.setProducts(res);

    });

  }

  setFilter(){
    this.filter = new Filter (this.currentSearch,this.rangeMax, this.rangeMin, this.subcategoryId, this.stock);
  }

  search(value:string){

    if (this.currentSearch != value){
      this.currentSearch = value;
    }else{
      this.currentSearch
    }

  }


  setProducts(products:Products[]){

    this.products= [];
    for (let i = 0; i < products.length; i++) { 
      let a = products[i];
      let product: Products = new Products(a.id, a.name, a.desc, a.price, a.stock,a.products_images,a.sub_categories);

      this.products.push(product);
    }
  }

  getFilterStock(stock:any){

    if (this.stock != stock){
      this.stock = stock
    }else{
      this.stock
    }

  }

  getFilterRange(max:any, min:any){
  
    if (this.rangeMax != max){
      this.rangeMax = max
    }else{
      this.rangeMax
    }

    if (this.rangeMin != min){
      this.rangeMin = min
    }else{
      this.rangeMin
    }

  }

  getFilterSubcategorie(sub_categorieId:any){

    if (this.subcategoryId != sub_categorieId){
      this.subcategoryId = sub_categorieId;
    }else{
      this.subcategoryId;
    }
  }


}
