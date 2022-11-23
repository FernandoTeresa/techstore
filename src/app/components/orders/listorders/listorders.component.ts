import { UserService } from 'src/app/services/user.service';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/classes/order';
import { User } from 'src/app/classes/user';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-listorders',
  templateUrl: './listorders.component.html',
  styleUrls: ['./listorders.component.css']
})
export class ListordersComponent implements OnInit {

  constructor(public orderservice:OrderService, public userservice:UserService, public router:Router) { }

  orders:Order[]=[];

  public get user(): User | null {
    return this.userservice.user;
  }

  ngOnInit(): void {
    if (!this.user){
      this.router.navigate(['/'])
      return; 
    }

    this.orderservice.getOrders().subscribe((res:Order[])=>{

      for (let i = 0; i<res.length;i++){
        let array = res[i]
        let order:Order = new Order (array.id, array.user_id, array.total, array.order_items, array.created_at)
        this.orders.push(order);
      }

    });
  }

  totalProducts(){
    let count =0;
    for (let i =0; i<this.orders.length;i++){
      for(let j=0;j<this.orders[i].order_items.length; j++){
        count += this.orders[i].order_items[j].count;
      }
    }
    return count;
  }

  orderDetails(idorder:number){
    this.router.navigate(['/order/'+idorder]);
  }

}
