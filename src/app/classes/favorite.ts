import { iFavorite } from './../interfaces/i-favorite';
export class Favorite implements iFavorite{
    productId: number;


    constructor(productId:number){
        this.productId = productId;
    }
}