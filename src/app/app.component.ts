import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { User } from './classes/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TechStore';

  constructor(public userservice: UserService, public router:Router){}

  ngOnInit(): void {
    let token_time = localStorage.getItem('expiresToken')
    if(!token_time){
      return;
    }
    let expires = parseInt(token_time);

    let date = moment().unix();

    if (date > expires){
      this.userservice.logout();
      this.router.navigate(['/login']);
    }

  }

}
