import { AuthToken } from 'src/app/classes/AuthToken';
import { ThemeService } from './../../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidenav-user',
  templateUrl: './sidenav-user.component.html',
  styleUrls: ['./sidenav-user.component.css']
})
export class SidenavUserComponent{

  constructor(public router:Router ,public userservice: UserService, public themeservice:ThemeService) {}

  public get user(): User | null {
    return this.userservice.user;
  }

  public get token():AuthToken{
    return this.userservice.token;
  }

  public clicked:boolean = false;


  logout(){

    console.log(this.token)
    this.userservice.logout().subscribe((res:any)=>{
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.userservice.user = null;
      this.userservice.userInfo = null;
      this.router.navigate(['/']);
      
    });
    
  }

  orders(){
    this.router.navigate(['/listorders']);
  }

  profile(){
    this.router.navigate(['/profile']);
  }

  login(event:any){
    if (event.returnValue){
      this.clicked = true;
    }else{
      this.clicked = false;
    }
  }

  register(){
    this.router.navigate(['/register']);
  }

}
