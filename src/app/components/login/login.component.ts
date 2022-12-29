import { UserService } from './../../services/user.service';
import { User } from './../../classes/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthToken } from 'src/app/classes/AuthToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public userservice: UserService, public router: Router) {}

  public get user(): User | null {
    return this.userservice.user;
  }

  ngOnInit(): void {}

  login_form(value: any) {
    if (value.username === '' || value.password === '') {
      alert('you must enter the username or the password');
      return;
    }

    this.userservice.requestToken(value).subscribe((res: AuthToken) => {
      this.userservice.setToken(res);

      this.userservice.getUser(res.access_token).subscribe((res: User) => {
        this.userservice.setUser(res);
      });
    });
  }
}
