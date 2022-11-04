import { Products } from 'src/app/classes/products';
import { ICart } from "../interfaces/i-Cart";

export class Cart implements ICart{
    productId: number;
    count:number;


    constructor(productId:number, count:number){
        this.productId=productId;
        this.count = count;
    }
}
