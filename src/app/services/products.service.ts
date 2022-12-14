import { ProductsImages } from './../classes/products-images';
import { Categories } from './../classes/categories';
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
  subcategories: SubCategories[] = [];
  categories: Categories[] = [];
  images: ProductsImages[] = [];


  constructor(private http: HttpClient, private router: Router, public userservice:UserService) { }


  requestProducts(){

    return this.http.get<Products[]>('http://localhost:85/products')

  }

  requestSubCategories(){

    return this.http.get<SubCategories[]>('http://localhost:85/subcategories')
  }

  requestCategories(){

    return this.http.get<Categories[]>('http://localhost:85/categories')
  }

  setCategories(categories:Categories[]){
    this.categories = [];

    for (let i = 0;i<categories.length; i++ ){
      let array = categories[i];
      let category: Categories = new Categories(array.id, array.name);
      this.categories.push(category);
    }
  }

  setSubCategories(subcategories:SubCategories[]){

    this.subcategories = [];

    for (let i = 0;i<subcategories.length; i++ ){
      let array = subcategories[i];
      let subcategorie: SubCategories = new SubCategories(array.id, array.name, array.categories);
      this.subcategories.push(subcategorie);
    }
  }

  setProducts(products:Products[]){

    this.products= [];
    for (let i = 0; i < products.length; i++) { 
      let a = products[i];
      let product: Products = new Products(a.id, a.name, a.desc, a.price, a.stock,a.products_images,a.sub_categories, a.categories);

      this.products.push(product);
    }
  }

  getSubCategories(){
    return this.http.get<SubCategories[]>('http://localhost:85/subcategories');
  }

  getCategories(){
    return this.http.get<Categories[]>('http://localhost:85/categories');
  }

  getProduct(id:number){
    let url = "http://localhost:85/products";
    if (id && id>0){
      url += "/"+id;
    }
    return this.http.get<Products>(url);
  }

  getProducts(){
    return this.http.get<Products[]>("http://localhost:85/products");
  }

  updateProduct(value:Products, productId:number){
    const Header = {
      headers: new HttpHeaders({
        Authorization: 'bearer '+ this.userservice.token.access_token
      })
    };

    return this.http.put<Products>('http://localhost:85/product/'+ productId , value, Header)
  }

  // removeProduct(productId:number){
  //   const Header = {
  //     headers: new HttpHeaders({
  //       Authorization: 'bearer '+ this.userservice.token.access_token
  //     })
  //   };
  //   this.http.delete<Products>('http://localhost:85/product/'+ productId, Header).subscribe((res:Products)=>{    
      
  //   },(err) => {
  //     switch(err.status){
  //       case 400:
  //         alert('ERROR!! Bad Request');
  //         break;
  //       case 401:
  //         alert('ERROR!! Unauthorized');
  //         break;
  //       case 403:
  //         alert('ERROR!! Forbidden');
  //         break;
  //       case 404:
  //         alert('ERROR!! Not Found');
  //         break;
  //       case 500:
  //         alert('ERROR!! Server Error');
  //         break;
  //       default:
  //         alert ('Unknow Error!!');
  //         break;
  //     }
  //   })
  // }

  addProduct(formData: any, HeaderWithImage:any){

   return this.http.post('http://localhost:85/product', formData, HeaderWithImage)
  }

  // uploadImages(image:any, productId:number){
  //   const Header = {
  //     headers: new HttpHeaders({
  //       Authorization: 'bearer '+ this.userservice.token.access_token
  //     })
  //   };
  //   this.http.post('http://localhost:85/product/img/'+ productId , image, Header).subscribe((res:any)=>{
  //   })

  // }

  addNewCategory(category:Categories){
    const Header = {
      headers: new HttpHeaders({
        Authorization: 'bearer '+ this.userservice.token.access_token
      })
    };

    return this.http.post<Categories>('http://localhost:85/categories', category, Header)

  }

  addNewSubCategory(subcategory:SubCategories){
    const Header = {
      headers: new HttpHeaders({
        Authorization: 'bearer '+ this.userservice.token.access_token
      })
    };

    return this.http.post<SubCategories>('http://localhost:85/subcategories', subcategory, Header)

  }


}
