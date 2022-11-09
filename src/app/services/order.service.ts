import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../classes/order';
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

  requestOrder(){
    this.http.get<Order[]>('http://localhost:85/order', Header).subscribe((res:Order[])=>{

      this.setOrder(res);
     
    });
  }

  setOrder(orders:Order[]){
    this.orders=[];
    for (let i=0;i<orders.length;i++){
      let array = orders[i];
      let order:Order = new Order(array.id,array.user_id, array.total, array.order_items);
      this.orders.push(order);
    }
  }

  getOrders(userId:number){

    return this.http.get<Order[]>('http://localhost:85/order/'+userId, Header);
  }


  addOrder(){


    this.http.post<Order[]>




    // addPost(title:string, content:string) {
    //   let iduser = this.userservice.getUser().id;
  
    //   if (iduser === null){
    //     alert('ERROR!! you have to be log');
    //     this.router.navigate(['']);
    //     return;
    //   }
    //   let value = {
    //     title:title,
    //     content:content,
    //     comments:[],
    //     id_user:iduser
    //   }
  
  
    //   this.http.post<Post>('http://localhost:85/post', value, Header).subscribe((res:Post)=>{
  
    //     this.dataRequestPost()
  
    //   },(err) => {
  
    //     switch(err.status){
    //       case 400:
    //         alert('ERROR!! Bad Request');
    //         break;
    //       case 401:
    //         alert('ERROR!! Unauthorized');
    //         break;
    //       case 403:
    //         alert('ERROR!! Forbidden');
    //         break;
    //       case 404:
    //         alert('ERROR!! Not Found');
    //         break;
    //       case 500:
    //         alert('ERROR!! Server Error');
    //         break;
    //       default:
    //         alert ('Unknow Error!!');
    //         break;
    //     }
    //   });
     
    // }
  }





  
}
