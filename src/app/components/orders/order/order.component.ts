import { UserInfos } from 'src/app/classes/user-infos';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from './../../../services/order.service';
import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/classes/order';
import { Products } from 'src/app/classes/products';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/classes/user';
import { OrderItem } from 'src/app/classes/order-item';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private _order: Order | null = null;

  public get order(): Order | null {
    return this._order;
  }
  public set order(value: Order | null) {
    this._order = value;
  }

  items:OrderItem[]=[];

  private _user: User | null = null;

  public get user(): User | null {
    return this._user;
  }

  public set user(value: User | null) {
    this._user = value;
  }

  private _userInfo: UserInfos | null = null;

  public get userInfo(): UserInfos | null {
    return this._userInfo;
  }

  public set userInfo(value: UserInfos | null) {
    this._userInfo = value;
  }

  private _orderid: number | null = null;
  public get orderid(): number | null {
    return this._orderid;
  }
  public set orderid(value: number | null) {
    this._orderid = value;
  }

  product:Products[]=[];



  constructor(private activatedroute: ActivatedRoute, public productservice:ProductsService, public orderservice:OrderService, public userservice:UserService) { }

  ngOnInit(): void {
    // this.activatedroute.paramMap.subscribe((params: any) => {
    //   const id = +params.get('id');
    //   this.orderid = id;

    //   if(!this.user){
    //     return
    //   }
    //   this.orderservice.getOrders(this.user.id).subscribe((res:Order[])=>{

    //     let find = res.find((item:Order)=>item.id === id);

    //     if (!find){
    //       return
    //     }

    //     this.order = new Order(find.id, find.user_id, find.total, find.order_items);
    //   });
      this.user = this.userservice.getUser();

      this.userservice.getUserInfo().subscribe((res:UserInfos)=>{
        
        this.userInfo = new UserInfos(res.id, res.address_1, res.address_2, res.city, res.postal_code, res.country, res.mobile, res.telephone, res.users_id);

      });

    })


    console.log(this.order)

  }




}
