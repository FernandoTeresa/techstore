import { UserInfos } from './../classes/user-infos';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import * as moment from 'moment';
import { IAuthToken } from '../interfaces/i-authToken';

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


  constructor(private http:HttpClient, private router:Router) { }

  getUser(){

    let localUser = localStorage.getItem('user')

    if (!localUser){
      return;
    }

    let user = JSON.parse(localUser)

    if(!user){
      return;
    }
    return user;

  }

  log(){
    let logon = localStorage.getItem('token');

    Header.headers = Header.headers.set('Authorization', 'bearer '+logon);

    if (logon){
      this.http.get<User>('http://localhost:85/auth/user', Header ).subscribe((res:User)=>{
     
      let user = new User(res.id,res.username,res.password,res.first_name, res.last_name, res.email, res.admin); 
      
      let localUser = JSON.stringify(user);
      localStorage.setItem('user',localUser);
      
      });

    }else{

      this.router.navigate(['/login']);
    }

  }

  login(data: User){

    this.http.post<IAuthToken>('http://localhost:85/login', data, Header).subscribe((res:IAuthToken) => {

      let date = moment().unix();

      if(res.access_token){
        localStorage.setItem('token', res.access_token);
        this.router.navigate(['/']);
      }else{
        this.router.navigate(['/login']);
      }

      if (date > res.expires_in){
        this.router.navigate(['/login']);
      }

      this.log();
    },(err)=> {

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
      };
    });
  }

  logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.http.post('http://localhost:85/logout',Header)
      this.router.navigate(['/']);
      
   
  }

  addUser(value: User){
    this.http.post<User>('http://localhost:85/user/add',value, Header).subscribe((res:User)=>{

      this.user = new User(res.id,res.username, res.password, res.first_name, res.last_name, res.email);

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

    console.log(value)
    this.http.put('http://localhost:85/user/'+ this.getUser().id, value, Header)
  }

  getUserInfo(){
    return this.http.get<UserInfos>('http://localhost:85/user/info/'+this.getUser().id, Header);
  }



  UploadUser(value:File){
    //falta
  }












}
