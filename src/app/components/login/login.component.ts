import { UserService } from './../../services/user.service';
import { User } from './../../classes/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public userservice:UserService, public router:Router) { }

  public get user(): User | null {
    return this.userservice.user;
  }

  ngOnInit(): void {
  }

  login_form(value:User){

    if (value.username === "" || value.password === ""){
      alert("you must enter the username or the password");
      return;
    }

    this.userservice.getToken(value);
    this.router.navigate(['/']);


  }

}
