import { IUser } from './../interfaces/i-user';

export class User implements IUser{
    id:number;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    admin?: boolean;

    constructor(id:number, username:string, password:string, first_name:string, last_name:string, email:string, admin?:boolean){
        this.id = id;
        this.username = username;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.admin = admin;
    }

}
