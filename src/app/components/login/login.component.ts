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
    return this.userservice.getUser();
  }

  ngOnInit(): void {
  }

  login_form(value:User){
    this.userservice.login(value);

  }

}
