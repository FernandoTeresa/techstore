import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(public productservice:ProductsService, public router:Router, public cartservice:CartService) { }

  ngOnInit(): void {
  }

  previous(){
    this.router.navigate(['/cart']);
  }


  

}
