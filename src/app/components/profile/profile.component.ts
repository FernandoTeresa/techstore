import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public userservice:UserService) { }

  ngOnInit(): void {
    this.userservice.getUser
  }

  updateProfile(value:User){
    this.userservice.updateUser(value);
    
  }

  

}
