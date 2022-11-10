import { OrderItem } from './order-item';
import { iOrders } from "../interfaces/i-orders";

export class Order implements iOrders{
    id:number;
    user_id:number;
    total: number;
    order_items: OrderItem[]=[];
    created_at?:Date;

    constructor(id:number, user_id:number, total:number, order_items:OrderItem[], created_at?:Date){
        this.id = id;
        this.user_id = user_id;
        this.total = total;
        this.order_items = [];
        for(let i=0;i<order_items.length;i++){
            let array = order_items[i]
            let orderItem = new OrderItem(array.id, array.count, array.unitprice, array.product_id, array.product, array.order_id)
            this.order_items.push(orderItem);
        }
        this.created_at = created_at;
    }
}
