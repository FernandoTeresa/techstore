import { CheckoutComponent } from './../components/cart/checkout/checkout.component';
import { IAuthToken } from './../interfaces/i-authToken';
import { UserInfos } from './../classes/user-infos';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import * as moment from 'moment';
import { AuthToken } from '../classes/AuthToken';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User;

  public get user(): User{
    return this._user;
  }

  public set user(value: User ) {
    this._user = value;
  }

  private _userInfo: UserInfos ;

  public get userInfo(): UserInfos  {
    return this._userInfo;
  }

  public set userInfo(value: UserInfos ) {
    this._userInfo = value;
  }

  private _token:AuthToken;

  public get token(): AuthToken{
    return this._token;
  }

  public set token(value: AuthToken) {
    this._token = value;
  }

  constructor(private http:HttpClient) { }

  getUser(token:any){

    const Header = { 
      headers: new HttpHeaders({ Authorization: 'bearer '+ token})
    };
    
    return this.http.get<User>('http://localhost:85/auth/user', Header )

  }

  requestToken(value:any){
    
    return this.http.post<AuthToken>('http://localhost:85/login', value)
  }

  setUser(user:User){
    this.user = new User(user.id, user.username, user.password, user.first_name, user.last_name, user.email, user.admin);
    let localUser = JSON.stringify(this.user);
    localStorage.setItem('user',localUser);  
  }

  setToken(value:AuthToken){

    if(value.access_token){
      localStorage.setItem('token', value.access_token);
      localStorage.setItem('expiresToken', value.expires_in.toString());

      this.token = new AuthToken(value.access_token, value.expires_in);
    }

  }

   // o subscribe fora dos serviços e utilizar nos componentes e popular as variaveis nos serviços
  logout(){

    const Header = {
      headers: new HttpHeaders({ Authorization: 'bearer '+ this.token.access_token })
    };
      return this.http.post('http://localhost:85/logout',Header);
  }

  addUser(value: User){
    this.http.post<User>('http://localhost:85/register',value).subscribe((res:User)=>{

      this.setUser(res);

    },(err) => {

      switch(err.status){
        case 400:
          alert('ERROR!! Bad Request');
          break;
        case 401:
          alert('ERROR!! Unauthorized');
          break;
        case 403:
          alert('ERROR!! Forbidden');
          break;
        case 404:
          alert('ERROR!! Not Found');
          break;
        case 500:
          alert('ERROR!! Server Error');
          break;
        default:
          alert ('Unknow Error!!');
          break;
      }
    })

  }

  updateUser(value:any){

    const Header = { 
      headers: new HttpHeaders({ Authorization: 'bearer '+ this.token.access_token})
    };

    return this.http.put('http://localhost:85/user/'+ this.user.id, value, Header);

  }

  getUserInfo(){
    const Header = { 
      headers: new HttpHeaders({ Authorization: 'bearer '+ this.token.access_token})
    };

    return this.http.get<UserInfos>('http://localhost:85/user/info/'+this.user.id, Header)
  }

  setUserInfo(userInfo:UserInfos){
    this.userInfo = new UserInfos(userInfo.id, userInfo.address_1, userInfo.address_2, userInfo.city, userInfo.postal_code, userInfo.country, userInfo.mobile, userInfo.telephone, userInfo.users_id);
  }


  UploadUser(value:File){
    //falta
  }



}