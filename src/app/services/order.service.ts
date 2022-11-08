import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public userservice:UserService, public productservice:ProductsService, private http: HttpClient) { }


  getOrder(){
    
  }



  
}
