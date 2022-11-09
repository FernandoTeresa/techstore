import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

    // adicionar o local storage aqui

    
    // let log_obj = JSON.parse(localStorage.getItem('user') || '{}');
    
    // if (log_obj === "" || log_obj === null){

    //   this.router.navigate(['/login']);
    // }else{

    //   this.userservice.user = log_obj;

    //   this.router.navigate(['/']);
    // }
  }









}
