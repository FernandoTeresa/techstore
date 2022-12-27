import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { Cart } from 'src/app/classes/cart';
import { Products } from 'src/app/classes/products';
import { UserInfos } from 'src/app/classes/user-infos';
import { relativeTimeThreshold } from 'moment';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/classes/order';
import { count } from 'rxjs';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit {

  constructor(public productservice:ProductsService, public router:Router, public cartservice:CartService, public userservice:UserService, public orderservice:OrderService) { }

  cart:Cart[]= [];
  
  products:Products[]=[];
  
  public get user(): User | null {
    return this.userservice.user;
  }

  public get userInfo(): UserInfos | null {
    return this.userservice.userInfo;
  }

  localDate = new Date();

  ngOnInit(): void {
    this.userservice.getUser();
    this.userservice.getUserInfo()

    if (!this.user){
      this.router.navigate(['/'])
      return
    }

    this.cart = this.cartservice.loadCart();

    this.productservice.getProducts().subscribe((res: Products[]) => {
      for (let i=0;i<res.length;i++){
        let array = new Products(res[i].id,res[i].name, res[i].desc, res[i].price, res[i].stock, res[i].products_images);
        this.products.push(array);
      }
    });

  }

  pay(){
    this.order();
    this.router.navigate(['/checkout']);
  }

  return(){
    this.router.navigate(['/cart']);
  }

  getProduct(id:number){

    let find = this.products.find((item:Products)=> item.id === id)

    if (!find){
      return;
    }

    return find;
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

  increment(){
    let count = 1;
    return count ++; 
  }
  

  order(){
    if (!this.user){
      return;
    }

    let orderItem:any[]=[]

    let order = {
      user_id: this.user.id,
      total: this.totalPriceCart(),
    }

    for (let i=0;i<this.cart.length;i++){
      let find = this.products.find((item)=>item.id===this.cart[i].productId);

      let obj={
        count: this.cart[i].count,
        unitprice:find?.price,
        product_id:find?.id,
        product:find
      }

      orderItem.push(obj);
    }

    this.orderservice.addOrder(order, orderItem)
  }

}
