import { ProductsService } from 'src/app/services/products.service';
import { Injectable } from '@angular/core';
import { Cart } from '../classes/cart';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Products } from '../classes/products';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart[] = []; 

  constructor(private http: HttpClient, private router: Router, public userservice:UserService, public productservice:ProductsService) { }

  savecart(){
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  addToCart(cart: Cart){

    const exist = this.cart.some((item)=>{
      return item.productId === cart.productId;
    });

    if (exist){
      this.cart.map((item)=>{
        item.count++;
      })
    }else{
      this.cart.push(cart);

    }
    this.savecart();

  }

  getCart(){
    return this.cart
  }

  loadCart(){
    let local = localStorage.getItem('cart');

    if(local){
      this.cart = JSON.parse(local)
    }else{
      this.cart = []
    }
   
  }

  productCart(cart: Cart){
    return this.cart.findIndex((item:Cart) => item.productId === cart.productId) > -1;
  }

  removeProductCart(id:number){
    const index = this.cart.findIndex((item:Cart)=>item.productId === id);

    console.log(index)

    if (index > -1){
      this.cart.splice(index,1);
      this.savecart();
    }

  }

  clearCart(){
    this.cart = [];
    localStorage.removeItem('cart');
  }
  


}
