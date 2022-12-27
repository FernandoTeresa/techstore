import { ProductsService } from 'src/app/services/products.service';
import { Injectable } from '@angular/core';
import { Cart } from '../classes/cart';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart[] = []; 

  constructor(public userservice:UserService, public productservice:ProductsService) { }

  savecart(){
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  addToCart(cart: Cart){

    const exist = this.cart.some((item)=>{

      return item.productId === cart.productId;
    });

    if (exist){
      this.cart.filter((item)=>{

        if (item.productId === cart.productId){
          item.count++;
        }

      })
    }else{
      this.cart.push(cart);

    }
    this.savecart();

  }

  addCountToCart(cart:Cart){

    let item = this.cart.find((item:Cart)=> item.productId === cart.productId)

    if (!item){
      return;
    }

    item.count ++;
    this.savecart();

  }

  removeCountToCart(cart:Cart){

    let item = this.cart.find((item:Cart)=> item.productId === cart.productId)

    if (!item){
      return;
    }

    if (item.count>0){
      item.count --;
      this.savecart();
    }else{
      item.count = 0;
      this.savecart();
    }

  }

  getCart(){
    return this.cart
  }

  loadCart(){
    let local = localStorage.getItem('cart');

    if(local){
      return this.cart = JSON.parse(local)
    }else{
      return this.cart = []
    }
   
  }

  productCart(cart: Cart){
    return this.cart.findIndex((item:Cart) => item.productId === cart.productId) > -1;
  }

  removeProductCart(id:number){
    const index = this.cart.findIndex((item:Cart)=>item.productId === id);

    if (index > -1){
      this.cart.splice(index,1);
      this.savecart();
    }

  }

  clearCart(){
    this.cart = [];
    localStorage.removeItem('cart');
  }
  

  totalCountCart(){
    return this.cart. reduce((accumulator, current) => {
      
        return accumulator + (Number(current.count))
    }, 0)

  }

}