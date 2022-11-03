import { ProductComponent } from './../components/products/product/product.component';
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
  cart: any[] = []; 

  constructor(private http: HttpClient, private router: Router, public userservice:UserService) { }


  requestProducts(){

    this.http.get<Products[]>('http://localhost:85/products').subscribe((res: Products[]) => {
      
      this.setProducts(res);

    });

  }

  requestSubCategories(){

    this.http.get<SubCategories[]>('http://localhost:85/subcategories').subscribe((res: SubCategories[]) => {
      
        this.setSubCategories(res)

    });
  }

  requestCategories(){

    this.http.get<Categories[]>('http://localhost:85/categories').subscribe((res: Categories[]) => {
      
        this.setCategories(res)

    });
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

      console.log(a);
      let product: Products = new Products(a.id, a.name, a.desc, a.price, a.stock,a.products_images,a.sub_categories, a.categories);

      this.products.push(product);
    }
  }

  getProduct(id:number){
    let url = "http://localhost:85/products";
    if (id && id>0){
      url += "/"+id;
    }
    return this.http.get<Products>(url,Header);
  }

  getProducts(){
    return this.http.get<Products[]>("http://localhost:85/products",Header);
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

  // requestImages(){

  //   this.http.get<ProductsImages[]>('http://localhost:85/product/imgs').subscribe((res: ProductsImages[]) => {
      
  //     this.setImages(res);

  // });

  // }

  // setImages(images:ProductsImages[]){
  //   this.images= [];

  //   for (let i = 0; i < images.length; i++) { 
  //     let a = images[i];
  //     let image: ProductsImages = new ProductsImages(a.id, a.images, a.product_id);
  //     this.images.push(image);
  //   }

  // }

  // getImages(id:number |null = null){
  //   let url = "http://localhost:85/product/imgs";
  //   if (id && id>0){
  //     url+="/"+id;
  //   }
  //   return this.http.get<ProductsImages[]>(url);
  // }

  // SHOPPING CART
  savecart(){
    localStorage.setItem('cart_items', JSON.stringify(this.cart));
  }

  addToCart(addproduct: any){
    this.cart.push(addproduct);
    this.savecart();
  }

  loadCart(){

    return this.cart = JSON.parse(localStorage.getItem('cart_items') as any) || [];
  }

  productCart(product: any){
    return this.cart.findIndex((item:any) => item.id === product.id) > -1;
  }

  removeProductCart(product: any){
    const index = this.cart.findIndex((item:any)=>item.id === product.id);

    if (index > -1){
      this.cart.splice(index,1);
      this.savecart();
    }
  }

  clearCart(){
    localStorage.removeItem('cart_items');
  }
  
  



}
