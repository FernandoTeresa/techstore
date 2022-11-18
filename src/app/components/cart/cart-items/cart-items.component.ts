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

  @Input() productItem: Cart |null = null

  constructor(public productservice:ProductsService, public router:Router, public cartservice:CartService) { }

  public get cart():Cart[]{
    return this.cartservice.loadCart();
  }

  ngOnInit(): void {
  }


  addCart(cartItem:Cart){
    this.cartservice.addToCart(cartItem);
  }

  removeFromCart(){
    if (!this.productItem){
      return;
    }
    this.cartservice.removeProductCart(this.productItem.productId);
    // this.cart = this.cartservice.getCart();
    this.router.navigate(['/cart'])
  }

  getImages():string{

    if(!this.productItem?.productId){
      return "";
    }

    let find = this.productservice.products.find((item)=> item.id === this.productItem?.productId)

    if (!find){
      return "";
    }

    return 'http://localhost:8080'+find.products_images[0].images
}

increment(){

  if (!this.productItem){
    return;
  }

  for(let i=0;i<this.cart.length;i++){

    if(this.productItem.productId === this.cart[i].productId){

      this.cartservice.addCountToCart(this.productItem);
      this.productItem.count ++;
    }else{
      this.productItem.count;
    }
  }
}

decrement(){

  if (!this.productItem){
    return;
  }

  if (this.productItem.count > 0){
    this.cartservice.removeCountToCart(this.productItem)
    this.productItem.count --;
  }else{
    this.productItem.count = 0;
  }

}

getProductsCart(){

  if(!this.productItem){
    return;
  }

  let verify = this.cartservice.productCart(this.productItem);


  if (verify){
    let find = this.productservice.products.find((item)=>item.id === this.productItem?.productId)
    return find;
  }
}

}