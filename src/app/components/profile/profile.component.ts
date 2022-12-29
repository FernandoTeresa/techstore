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
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(public userservice: UserService, public router: Router) {}

  public get user(): User {
    return this.userservice.user;
  }

  public get userInfo(): UserInfos {
    return this.userservice.userInfo;
  }

  ngOnInit(): void {
    if (!this.user) {
      this.router.navigate(['/']);
      return;
    }

    this.userservice.getUserInfo().subscribe((res: UserInfos) => {
        this.userservice.setUserInfo(res);
      });
  }

  updateProfile(value: any) {
    if (!this.user) {
      return;
    }

    let pass = <HTMLInputElement>document.getElementById('password');
    let repeat_pass = <HTMLInputElement>document.getElementById('raw_password');
    let old_pass = <HTMLInputElement>document.getElementById('old_password');

    if (pass.value != '' && old_pass.value === '') {
      alert('You have to introduce the current password first');
      old_pass.value = '';
      pass.value = '';
      repeat_pass.value = '';
    } else {
      if (pass.value != repeat_pass.value) {
        alert('Password and Confirm password dont match');
        pass.value = '';
        repeat_pass.value = '';
      } else {
        let data: any = {
          address_1: value.address_1,
          address_2: value.address_2,
          city: value.city,
          country: value.country,
          first_name: value.first_name,
          last_name: value.last_name,
          mobile: value.mobile,
          old_password: value.old_password,
          raw_password: value.raw_password,
          password: value.password,
          postal_code: value.postal_code,
          email: this.user.email,
          telephone: value.telephone,
        };
        
        this.userservice.updateUser(data).subscribe((res:any)=>{

        },(err)=>{
    
          let errorPass = err.error.old_password
            
          alert(errorPass);
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
