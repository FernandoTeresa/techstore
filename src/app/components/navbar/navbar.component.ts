import { CartService } from 'src/app/services/cart.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { Cart } from 'src/app/classes/cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cart:Cart[]=[];

  constructor(public router:Router, public userservice: UserService, public cartservice: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartservice.loadCart();
    this.cartservice.totalCountCart();
    this.user = this.userservice.getUser();
  }

  private _user: User | null = null;

  public get user(): User | null {
    return this._user;
  }
  public set user(value: User | null) {
    this._user = value;
  }
  

  logout(){
    this.userservice.logout();
  }

  profile(){
    this.router.navigate(['/profile']);
  }

  orders(){
    this.router.navigate(['/listorders']);
  }
  home(){
    this.router.navigate(['/']);
  }

  login(){
    this.router.navigate(['/login']);
  }

  register(){
    this.router.navigate(['/register']);
  }

  CartRedirect(){
    this.router.navigate(['/cart']);
  }

  countCart(){
      return this.cartservice.totalCountCart()
  }

  openNav() {
    let x = <HTMLInputElement>document.getElementById("mySidenav");
    x.style.width = "250px";
    let y = <HTMLInputElement>document.getElementById("main");
    y.style.marginLeft = "250px";
  }
  
  closeNav() {
    let x =  <HTMLInputElement>document.getElementById("mySidenav");
    x.style.width = "0";
    let y =  <HTMLInputElement>document.getElementById("main");
    y.style.marginLeft= "0";
  }
  

}
