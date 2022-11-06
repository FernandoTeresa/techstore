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
  
  products:Products[]=[];

  ngOnInit(): void {

    this.cartservice.loadCart();
    this.cart = this.cartservice.getCart();

    this.productservice.getProducts().subscribe((res: Products[]) => {
      for (let i=0;i<res.length;i++){
        let array = new Products(res[i].id,res[i].name, res[i].desc, res[i].price, res[i].stock, res[i].products_images);
        this.products.push(array);
      }
    });
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

  removeFromCart(id:any){
    this.cartservice.removeProductCart(id);
    this.cart = this.cartservice.getCart();
  }

  img(){
      return 'http://localhost:8080'+this.getImages();
  }

  continueShopp(){
    this.router.navigate(['']);
  }


 getProduct(){
  for (let i=0;i< this.products.length;i++){
    for(let j=0;j<this.cart.length;j++){
      if (this.products[i].id === this.cart[j].productId){
        return this.products[i];
      }
    }
  }
 }

  getImages(){
    for (let i=0;i< this.products.length;i++){
      for(let j=0;j<this.cart.length;j++){
        if (this.products[i].id === this.cart[j].productId){
          return this.products[i].products_images[0].images;
        }
      }
  }
}

getCount(){
  for (let i=0;i< this.products.length;i++){
    for(let j=0;j<this.cart.length;j++){
      if (this.products[i].id === this.cart[j].productId){
        return this.cart[j].count;
      }
    }
  }
}

    







}
