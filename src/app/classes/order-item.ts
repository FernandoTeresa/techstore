import { Products } from 'src/app/classes/products';
import { iOrderItem } from "../interfaces/i-order-item";

export class OrderItem implements iOrderItem{
    id:number;
    count:number;
    unitprice: number;
    product_id:number;
    product:Products[];
    order_id:number;


    constructor(id:number, count:number, unitprice:number, product_id:number,product:Products[], order_id:number){
        this.id = id;
        this.count = count;
        this.unitprice = unitprice;
        this.product_id = product_id;
        this.product= [];
        for (let i=0;i<product.length;i++){
            let array = product[i];
            let prod = new Products(array.id, array.name, array.desc, array.price, array.stock, array.products_images);
            this.product.push(prod);
        }
        this.order_id = order_id;

    }

}
