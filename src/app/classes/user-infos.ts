import { User } from './user';
import { iUserInfo } from './../interfaces/i-user-info';

export class UserInfos implements iUserInfo{
    id:number;
    address_1: string;
    address_2: string;
    city: string;
    postal_code: number;
    country: string;
    mobile: number;
    telephone: number;
    users_id: number;

    constructor(id:number, address_1:string, address_2: string, city: string, postal_code: number,  country: string,  mobile: number, telephone: number, users_id: number){
        this.id = id;
        this.address_1 = address_1;
        this.address_2 = address_2;
        this.city = city;
        this.postal_code = postal_code;
        this.country = country;
        this.mobile = mobile;
        this.telephone = telephone;
        this.users_id = users_id;
    }

}
