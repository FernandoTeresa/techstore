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

  cart:Cart[]= [];
  
  products:Products[]=[];

  ngOnInit(): void {

    // this.cartservice.loadCart();
    this.cart = this.cartservice.loadCart();

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

  removeFromCart(){
    if (!this.productItem){
      return;
    }
    this.cartservice.removeProductCart(this.productItem.productId);
    this.cart = this.cartservice.getCart();
    this.router.navigate(['/cart'])
  }

  getImages():string{
    if(!this.productItem?.productId){
      return "";
    }
    for (let i=0;i< this.products.length;i++){
      if (this.products[i].id === this.productItem.productId){
        for(let j=0;j<this.cart.length;j++){
          if (this.products[i].id === this.cart[j].productId){
            return 'http://localhost:8080'+this.products[i].products_images[0].images;
          }
        }
      }
    }
    return "";
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
    for(let i=0;i<this.products.length;i++){
      if (this.products[i].id === this.productItem.productId)
        return this.products[i]
    }
  }
}

}