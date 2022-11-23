import { CheckoutComponent } from './../components/cart/checkout/checkout.component';
import { IAuthToken } from './../interfaces/i-authToken';
import { UserInfos } from './../classes/user-infos';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import * as moment from 'moment';
import { AuthToken } from '../classes/AuthToken';

const Header = {
  headers: new HttpHeaders({
    Authorization: 'bearer '+ localStorage.getItem('token')
  })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  private _token: IAuthToken | null = null;

  public get token(): IAuthToken | null {
    return this._token;
  }
  public set token(value: IAuthToken | null) {
    this._token = value;
  }




  constructor(private http:HttpClient, private router:Router) { }

  getUser(){
    let token = localStorage.getItem('token');

    if (!token){
      return;
    }

    Header.headers = Header.headers.set('Authorization', 'bearer '+token);
    
    return this.http.get<User>('http://localhost:85/auth/user', Header ).subscribe((res:User)=>{

      this.setUser(res);
    },(err)=>{

      if (err.status === 401){
        this.router.navigate(['/']);
        this.logout();
      }
    });

  }

  requestToken(value:any){
    return this.http.post<AuthToken>('http://localhost:85/login', value, Header)
  }

  setUser(user:User){
    this.user = new User(user.id, user.username, user.password, user.first_name, user.last_name, user.email, user.admin);
    let localUser = JSON.stringify(this.user);
    localStorage.setItem('user',localUser);  
  }

  getToken(value:any){
    return this.http.post<AuthToken>('http://localhost:85/login', value, Header).subscribe((res:AuthToken)=>{
      this.setToken(res);
    },(err)=>{
      console.log(err)

      if (err.status === 422){
        alert("Password or Username invalid");
      }

      if (err.status === 401){
        alert("User dont exist");
      }
    });
  }

  setToken(value:AuthToken){

    if(value.access_token){
      localStorage.setItem('token', value.access_token);
      localStorage.setItem('expiresToken', value.expires_in.toString());

      this.token = new AuthToken(value.access_token, value.expires_in);
      this.getUser()
    }

  }

  logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.user = null;
      this.userInfo = null;
      this.http.post('http://localhost:85/logout',Header);
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
    if (!this.user){
      return "User dont exist";
    }

    this.http.put('http://localhost:85/user/'+ this.user.id, value, Header).subscribe((res:any)=>{
    })

  }

  getUserInfo(){
    if(!this.user){
      return "User dont exist";
    }
    return this.http.get<UserInfos>('http://localhost:85/user/info/'+this.user.id, Header).subscribe((res:UserInfos)=>{
      this.setUserInfo(res);
    },(err)=>{

      if (err.status === 401){
        this.logout();
      }
    });
  }

  setUserInfo(userInfo:UserInfos){
    this.userInfo = new UserInfos(userInfo.id, userInfo.address_1, userInfo.address_2, userInfo.city, userInfo.postal_code, userInfo.country, userInfo.mobile, userInfo.telephone, userInfo.users_id);
  }

  // checkPass(username:string, password:string){
  //   let data:any={
  //     username: username,
  //     password: password
  //   }

  //   return this.http.post<Code>('http://localhost:85/check', data, Header).subscribe((res:any)=>{
  //     this.code = new Code(res);
  //   });

  // }


  UploadUser(value:File){
    //falta
  }



}