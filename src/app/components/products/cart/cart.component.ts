import { Products } from 'src/app/classes/products';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public productservice:ProductsService) { }

  cart:Products[]= [];

  ngOnInit(): void {
    this.cart = this.productservice.loadCart();
  }


  image(id:number){

  }







}
