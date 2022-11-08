import { iOrderItem } from "../interfaces/i-order-item";

export class OrderItem implements iOrderItem{
    id:number;
    count:number;
    unitprice: number;
    product_id:number;
    order_id:number;


    constructor(id:number, count:number, unitprice:number, product_id:number, order_id:number){
        this.id = id;
        this.count = count;
        this.unitprice = unitprice;
        this.product_id = product_id;
        this.order_id = order_id

    }

}
