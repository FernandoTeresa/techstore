import { FilterService } from './../../services/filter.service';
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

  theme: Boolean = false;

  constructor(public router:Router, public filterservice:FilterService ,public userservice: UserService, public cartservice: CartService) {
  }

  public get user(): User | null {
    return this.userservice.user;
  }

  public get cart(): Cart[]{
    return this.cartservice.cart;
  }

  ngOnInit(): void {
    let local = localStorage.getItem("theme")
    if(!local){
      return;
    }
    this.theme = JSON.parse(local);
    this.check();

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
      x.style.width = "300px";
    } else {
      this.showNav = false;
      x.style.width = "0";
    }

  }
  
  onChange(event:any) {
    let radioStatus = event.target.checked;
    localStorage.setItem("theme", radioStatus);

    window.location.reload();

  }

  check(){
    let x = document.getElementById("toggle") as HTMLInputElement

    if( this.theme === true && x.checked ===false){
      x.checked = true;
    }else if (this.theme === false && x.checked ===true){
      x.checked = false
    }

  }

  darkMode(){
    if (this.theme === true){
      return 'bg-dark';
    }else{
      return 'bg-primary';
    }
  }

 






}
