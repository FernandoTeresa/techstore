import { CartService } from 'src/app/services/cart.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public router:Router, public userservice: UserService, public cartservice: CartService) { }

  ngOnInit(): void {
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

  logout(){
    this.userservice.logout();
    this.router.navigate(['/login']);
  }

  cart(){
    this.router.navigate(['/cart']);
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
