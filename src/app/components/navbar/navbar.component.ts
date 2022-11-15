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

  constructor(public router:Router, public userservice: UserService, public cartservice: CartService) { }

  public get user(): User | null {
    return this.userservice.getUser();
  }

  public get cart(): Cart[]{
    return this.cartservice.loadCart();
  }


  ngOnInit(): void {
    this.cartservice.totalCountCart();

    if (this.user){
      window.onload = function () {
        if (! localStorage.getItem('justOnce')) {
          localStorage.setItem("justOnce", "true");
          window.location.reload();
        }
      }
    }

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
    this.router.navigate(['/login'])
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

  addProduct(){
      this.router.navigate(['/addProduct']);
  }

  addCategory(){
    this.router.navigate(['/addCategory']);
  }

  addSubCategory(){
    this.router.navigate(['/addSubCategory']);
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
