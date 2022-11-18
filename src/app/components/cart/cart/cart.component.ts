import { ProductComponent } from './../../products/product/product.component';
import { CartService } from '../../../services/cart.service';
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
  
  public get products():Products[]{
    return this.productservice.products;
  }

  public get cart(): Cart[]{
    return this.cartservice.loadCart();
  } 

  ngOnInit(): void {
    this.productservice.requestProducts();

  }

  cleanCart(){
    this.cartservice.clearCart();
    this.router.navigate(['/cart']).then(()=>{
      window.location.reload();
    });
  }

  continueShopp(){
    this.router.navigate(['']);
  }


  totalPriceCart(){
    return this.products. reduce((accumulator, current) => {
      let cartProduct = this.cart.find((item)=>item.productId === current.id)

      if(cartProduct){

        return accumulator + (Number(current.price) * cartProduct.count)
      }
      return accumulator
    }, 0)
  }

  checkout(){
      if (this.cart.length < 1){
        return alert('You dont have any products to pay');
      }
      this.router.navigate(['/invoice']);
  }



}