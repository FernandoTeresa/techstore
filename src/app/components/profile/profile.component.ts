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

  constructor(public userservice:UserService) { }

  private _user: User | null = null;

  public get user(): User | null {
    return this._user;
  }
  public set user(value: User | null) {
    this._user = value;
  }

  private _userInfo: UserInfos | null = null;

  public get userInfo(): UserInfos | null {
    return this._userInfo;
  }
  public set userInfo(value: UserInfos | null) {
    this._userInfo = value;
  }

  ngOnInit(): void {
    this.user = this.userservice.getUser();

    this.userservice.getUserInfo().subscribe((res:UserInfos)=>{
      this.userInfo = new UserInfos(res.id,res.address_1, res.address_2, res.city, res.postal_code, res.country, res.mobile, res.telephone, res.users_id)
    })
  }

  updateProfile(value:any){
    if(!this.user){
      return
    }

    if(!this.userInfo){
      return
    }


    let data:any={
      password: value.password,
      first_name: value.first_name,
      last_name: value.last_name,
      email: this.user.email,

      address_1: value.address_1,
      address_2: value.address_2,
      city: value.city,
      postal_code: value.postal_code,
      country: value.country,
      mobile: value.mobile,
      telephone: value.telephone,
      users_id: this.user.id
    }

    this.userservice.updateUser(data);

    //NAO FUNCIONA
    
  }

  

}
