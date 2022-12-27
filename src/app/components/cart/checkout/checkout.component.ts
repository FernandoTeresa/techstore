import { UserService } from 'src/app/services/user.service';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { Cart } from 'src/app/classes/cart';
import { Products } from 'src/app/classes/products';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(public productservice:ProductsService, public router:Router, public cartservice:CartService, public orderservice:OrderService, public userservice:UserService) { }

  cart:Cart[]= [];
  products:Products[]=[];

  public get user():User | null {
    return this.userservice.user;
  }

  ngOnInit(): void {
  
    this.cart = this.cartservice.loadCart();
    if (!this.user){
      this.router.navigate(['/'])
      return
    }

    this.productservice.getProducts().subscribe((res: Products[]) => {
      for (let i=0;i<res.length;i++){
        let array = new Products(res[i].id,res[i].name, res[i].desc, res[i].price, res[i].stock, res[i].products_images);
        this.products.push(array);
      }
    });


  }

  previous(){
    this.router.navigate(['/cart']);
  }

  getProduct(id:number){

    let find = this.products.find((item:Products)=> item.id === id)

    if (!find){
      return;
    }

    return find;
  }

  itemCountTotal(){
    let sumCount = this.cart.reduce( (previous, current)=> previous + current.count,0)

    return sumCount;
  }

  itemCountPrice(id:number){

    let findItem = this.products.find((item:Products)=>item.id === id);

    let findCart = this.cart.find((item:Cart)=>item.productId === id);

    if(!findCart || !findItem){
      return null;
    }

    return findCart.count * findItem.price;
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

  totalTax(){
    let tax =  this.totalPriceCart() * 0.23;
    return Math.round((tax + Number.EPSILON) * 100) / 100
  }

  totalPay(){
    return this.totalPriceCart() + this.totalTax();
  }


}
