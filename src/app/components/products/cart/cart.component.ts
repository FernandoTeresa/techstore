import { CartService } from './../../../services/cart.service';
import { Products } from 'src/app/classes/products';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { Cart } from 'src/app/classes/cart';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public productservice:ProductsService, public router:Router, public cartservice:CartService) { }

  cart:Cart[]= [];
  
  ngOnInit(): void {

    this.cartservice.loadCart();
    this.cart = this.cartservice.getCart();
  }

  addCart(cartItem:Cart){

    this.cartservice.addToCart(cartItem);
  }

  cleanCart(){
    this.cartservice.clearCart();
    this.router.navigate(['/cart']).then(()=>{
      window.location.reload();
    });
  }

  removeFromCart(item:any){
    this.cartservice.removeProductCart(item.id);
    this.cart = this.cartservice.getCart();
  }

  img(images:any){
    console.log(images)
      return 'http://localhost:8080'+images

  }

  myfunction = (idProduct:number):void=>{
    this.cart.find((item:Cart)=>{
      idProduct = item.productId;
    })
  }


  continueShopp(){
    this.router.navigate(['']);
  }







}
