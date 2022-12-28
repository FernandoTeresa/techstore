import { ThemeService } from './../../../services/theme.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidenav-user',
  templateUrl: './sidenav-user.component.html',
  styleUrls: ['./sidenav-user.component.css']
})
export class SidenavUserComponent {

  constructor(public router:Router ,public userservice: UserService, public themeservice:ThemeService) {}

  public get user(): User | null {
    return this.userservice.user;
  }

  logout(){
    this.router.navigate(['/']);
    this.userservice.logout();
  }

  orders(){
    this.router.navigate(['/listorders']);
  }

  profile(){
    this.router.navigate(['/profile']);
  }

  login(){
    this.router.navigate(['/login'])

    //embutir o login e o register no sidenav
  }

  register(){
    this.router.navigate(['/register']);
  }

}
