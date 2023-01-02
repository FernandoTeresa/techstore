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

  public get orders():Order[]{
    return this.orderservice.orders;
  }

  public get user(): User | null {
    return this.userservice.user;
  }

  ngOnInit(): void {
    if (!this.user){
      this.router.navigate(['/'])
      return; 
    }

    this.orderservice.requestOrder().subscribe((res:Order[])=>{

      this.orderservice.setOrder(res);
     
    });;
  }

  totalProducts(id:any){
    let count =0;

    for (let i =0; i<this.orders.length;i++){

      let filter = this.orders[i].order_items.filter((item)=>item.order_id === id)

      for (let i = 0; i<filter.length;i++){

        count += filter[i].count
      }
    }
    return count;
  }

  orderDetails(idorder:number){
    this.router.navigate(['/order/'+idorder]);
  }

}
