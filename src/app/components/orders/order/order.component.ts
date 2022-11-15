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

  public get user(): User | null {
    return this.userservice.getUser();
  }

  private _userInfo: UserInfos | null = null;

  public get userInfo(): UserInfos | null {
    return this._userInfo;
  }

  public set userInfo(value: UserInfos | null) {
    this._userInfo = value;
  }


  constructor(private activatedroute: ActivatedRoute, public productservice:ProductsService, public orderservice:OrderService, public userservice:UserService) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params: any) => {
      const id = +params.get('id');

      this.orderservice.getOrderById(id).subscribe((res:Order)=>{
          this.order = new Order(res.id, res.user_id, res.total, res.order_items);
      });

      this.userservice.getUserInfo().subscribe((res:UserInfos)=>{
        
        this.userInfo = new UserInfos(res.id, res.address_1, res.address_2, res.city, res.postal_code, res.country, res.mobile, res.telephone, res.users_id);
      });

    });

  }

  getImages(productId:number):string{
    if (!this.order){
      return "";
    }
    if(!this.order.order_items){
      return "";
    }

    let image = this.order.order_items.find((item)=>item.product.id === productId);

    if(!image){
      return "";
    }

    return 'http://localhost:8080'+image.product.products_images[0].images;

  }


  price():number{
    if (!this.order){
      return 0;
    }

    return this.order.order_items.reduce((accumulator, current) => {

      let item = this.order?.order_items.find((res)=> res.id === current.id)

      if (item){
        return accumulator + (Number(current.unitprice) * item.count)
      }
      return accumulator;

    },0)
  }

  totalTax():number{

    if (!this.price()){
      return 0;
    }
    return this.price() *0.23;
  }

  totalPay():number{
    return this.price() + this.totalTax();
  }

}
