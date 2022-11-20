import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { UserInfos } from 'src/app/classes/user-infos';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public userservice:UserService, public router:Router) { }

  public get user(): User | null {
    return this.userservice.user;
  }

  public get userInfo(): UserInfos | null {
    return this.userservice.userInfo;
  }

  ngOnInit(): void {
    this.userservice.getUser();
    this.userservice.getUserInfo();
  }

  updateProfile(value:any){
    if(!this.user){
      return
    }

    let old_pass = <HTMLInputElement>document.getElementById("old_pass");
    let pass = <HTMLInputElement>document.getElementById("password");
    let repeat_pass = <HTMLInputElement>document.getElementById("repeat_pass");

    if (pass.value === '' && repeat_pass.value === '' && old_pass.value != ''){
      alert('you have to introduce the new password');

    }else{

      if (old_pass.value === this.user.password || old_pass.value === ''){ 

        if (pass.value != repeat_pass.value){
              alert("Passwords dont match");
              pass.value= '';
              repeat_pass.value = '';  
        }else{

          let data:any={
            address_1: value.address_1,
            address_2: value.address_2,
            city: value.city,
            country: value.country,
            first_name: value.first_name,
            last_name: value.last_name,
            mobile: value.mobile,

            password: value.password,
            postal_code: value.postal_code,
            email: this.user.email,
            telephone: value.telephone,
          }

          this.userservice.updateUser(data);
          this.router.navigate(['/']);
        }

      }else if(old_pass.value != this.user.password){
        alert('Current password dont match');
      }
    }
    
  }


}
