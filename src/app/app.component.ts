import { FilterService } from './services/filter.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthToken } from './classes/AuthToken';
import { User } from './classes/user';
import { UserService } from './services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { Filter } from './classes/filter';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TechStore';

  constructor(public userservice: UserService, public router:Router, public cartservice:CartService, public filterservice:FilterService){}

  public get user():User | null{
    return this.userservice.user;
  }
  public get token():AuthToken | null{
    return this.userservice.token
  }


  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token){
      this.userservice.getUser(token).subscribe((res:User)=>{

        this.userservice.setUser(res);
      },(err)=>{
        
        console.log(err);
        
      });
    }
 
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
      this.userservice.logout().subscribe((res:any)=>{

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.userservice.user = null;
        this.userservice.userInfo = null;
        this.router.navigate(['/']);
      });
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

  outside(event:any){

    let x = <HTMLElement>document.getElementById('mySidenav');
    if(event){
      x.style.width = '0';
    }
  }

  outsideUserNav(event:any){

    let y = <HTMLElement>document.getElementById('mySidenavUser');

    if(event){
      y.style.width = '0';
    }

  }

}
