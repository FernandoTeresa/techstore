import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthToken } from './classes/AuthToken';
import { User } from './classes/user';
import { UserService } from './services/user.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TechStore';

  constructor(public userservice: UserService, public router:Router, public cartservice:CartService){}

  public get user():User | null{
    return this.userservice.user;
  }

  public get token():AuthToken | null{
    return this.userservice.token
  }



  ngOnInit(): void {
 
    this.cartservice.loadCart();
    let token_time = localStorage.getItem('expiresToken');
    
    if (!this.token){
      return 
    }

    if (!token_time){
      return
    }


    let expires = parseInt(token_time);

    let date = moment().unix();

    if (date > expires || date > this.token.expires_in){
      this.userservice.logout();
      this.router.navigate(['/login']);
    }

  }


  changeTheme(){
    let theme = localStorage.getItem('theme')

    if(!theme){
      return;
    }

    let darkMode = JSON.parse(theme);

    if (darkMode === true){
      return 'bg-secondary'
    }else{
      return '';
    }

  }

}
