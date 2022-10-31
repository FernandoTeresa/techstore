import { User } from './../classes/user';

export interface iUserInfo{
    id:number;
    address_1: string;
    address_2: string;
    city: string;
    postal_code: number;
    country: string;
    mobile: number;
    telephone: number;
    users_id: number;
    user: User

}