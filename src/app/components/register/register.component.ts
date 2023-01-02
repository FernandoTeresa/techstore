import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public userservice:UserService, public router:Router) { }

  ngOnInit(): void {
    
  }

  adduser(values:User){

    let user = <HTMLInputElement>document.getElementById("new_username");
    let pass = <HTMLInputElement>document.getElementById("new_password");
    let repeat_pass = <HTMLInputElement>document.getElementById("repeat_password");
    let fname = <HTMLInputElement>document.getElementById("first_name");
    let lname = <HTMLInputElement>document.getElementById("last_name");
    let email = <HTMLInputElement>document.getElementById("email");


    if ((user?.value != '') && (pass?.value != '') && (repeat_pass?.value != '') && (fname?.value != '') && (lname?.value != '') && (email?.value != '')){ 
      
      if (pass.value != repeat_pass.value){
            alert("Passwords dont match");
            pass.value= '';
            repeat_pass.value = '';  

      }else{
        this.userservice.addUser(values).subscribe((res:User)=>{

          this.userservice.setUser(res);
    
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
        this.router.navigate(['/login']);
      }
    }else{
      alert('Invalid Username or Password');
    }
  }

}
