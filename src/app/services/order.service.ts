import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../classes/order';
import { OrderItem } from '../classes/order-item';
import { Products } from '../classes/products';
import { User } from '../classes/user';
import { ProductsService } from './products.service';
import { UserService } from './user.service';

const Header = {
  headers: new HttpHeaders({
    Authorization: 'bearer '+ localStorage.getItem('token'), 
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(public userservice:UserService, public productservice:ProductsService, private http: HttpClient) { }

  orders: Order[]=[];

  private _orderById: Order | null = null;
  
  public get orderById(): Order | null {
    return this._orderById;
  }
  public set orderById(value: Order | null) {
    this._orderById = value;
  }

  public get products():Products[]{
    return this.productservice.products;
  }

  requestOrder(){
    this.http.get<Order[]>('http://localhost:85/order', Header).subscribe((res:Order[])=>{

      this.setOrder(res);
     
    });
  }

  setOrder(orders:Order[]){
    this.orders=[];
    for (let i=0;i<orders.length;i++){
      let array = orders[i];
      let order:Order = new Order(array.id,array.user_id, array.total, array.order_items, array.created_at);
      this.orders.push(order);
    }
  }

  setOrderById(order:Order){
    this.orderById = new Order(order.id, order.user_id, order.total, order.order_items, order.created_at);
  }

  requestOrderById(orderId:number){
    return this.http.get<Order>('http://localhost:85/order/'+orderId, Header).subscribe((res:Order)=>{
      this.setOrderById(res)
    });
  }

  addOrder(order:any, orderItem:any){

    return this.http.post('http://localhost:85/order',order, Header).subscribe((res:any)=>{

      for (let i=0;i<orderItem.length;i++){

        let find = this.products.find((item)=>item.id == orderItem[i].product_id);

        let orderitems:any = {
          count: orderItem[i].count,
          unitprice: orderItem[i].unitprice,
          product_id: orderItem[i].product_id,
          product: find,
          order_id: res.id
        }

        this.addOrderItems(orderitems);
      }

    })

  }

  addOrderItems(items:any){

    return this.http.post('http://localhost:85/order/item',items,Header).subscribe((res:any)=>{
      
    })

  }





  
}
