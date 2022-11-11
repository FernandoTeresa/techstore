import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  }









}
