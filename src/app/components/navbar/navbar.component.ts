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

  showNav: Boolean = false;

  constructor(public router:Router, public userservice: UserService, public cartservice: CartService) {
  }

  public get user(): User | null {
    return this.userservice.user;
  }

  public get cart(): Cart[]{
    return this.cartservice.cart;
  }

  ngOnInit(): void {
    this.userservice.getUser();
  }

  logout(){
    this.router.navigate(['/']);
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
    this.router.navigate(['/login'])
  }

  register(){
    this.router.navigate(['/register']);
  }

  CartRedirect(){
    this.router.navigate(['/cart']);
  }

  addProduct(){
      this.router.navigate(['/addProduct']);
  }

  addCategory(){
    this.router.navigate(['/addCategory']);
  }

  addSubCategory(){
    this.router.navigate(['/addSubCategory']);
  }

  favorites(){
    this.router.navigate(['/favorites']);
  }

  toggleNav(){
    let x = <HTMLElement>document.getElementById("mySidenav");
    if (this.showNav === false){
      this.showNav = true;
      x.style.width = "250px";
    } else {
      this.showNav = false;
      x.style.width = "0";
    }

  }
}
