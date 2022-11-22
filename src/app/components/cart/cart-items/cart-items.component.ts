import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/classes/cart';
import { Products } from 'src/app/classes/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {

  constructor(public productservice:ProductsService, public router:Router, public cartservice:CartService) { }

  public get cart():Cart[]{
    return this.cartservice.loadCart();
  }

  public get products():Products[]{
    return this.productservice.products;
  }

  ngOnInit(): void {
    this.cartservice.getCart();
    this.productservice.requestProducts();

  }

  addCart(cartItem:Cart){
    this.cartservice.addToCart(cartItem);
  }

  removeFromCart(cartItem:Cart){
 
    this.cartservice.removeProductCart(cartItem.productId);
    this.router.navigate(['/cart'])
  }

  getImages(cartItem:Cart):string{

    let find = this.productservice.products.find((item)=> item.id === cartItem.productId)

    if (!find){
      return "";
    }

    return 'http://localhost:8080'+find.products_images[0].images
}

increment(cartItem:Cart){

  for(let i=0;i<this.cart.length;i++){

    if(cartItem.productId === this.cart[i].productId){

      this.cartservice.addCountToCart(cartItem);
      cartItem.count ++;
    }else{
      cartItem.count;
    }
  }
}

decrement(cartItem:Cart){

  if (cartItem.count > 1){
    this.cartservice.removeCountToCart(cartItem)
    cartItem.count --;
  }else{
    cartItem.count = 1;
  }

}

getProductsCart(cartItem:Cart){

  for (let i=0 ; i < this.products.length; i++ ){
    if(this.products[i].id === cartItem.productId){
      return this.products[i]
    }
  }

}


}