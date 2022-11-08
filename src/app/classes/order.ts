import { OrderItem } from './order-item';
import { iOrders } from "../interfaces/i-orders";

export class Order implements iOrders{
    id:number;
    user_id:number;
    total: number;
    orderitem: OrderItem[]=[];

    constructor(id:number, user_id:number, total:number, orderitem:OrderItem[]){
        this.id = id;
        this.user_id = user_id;
        this.total = total;
        this.orderitem = [];
        for(let i=0;i<orderitem.length;i++){
            let orderitems = new OrderItem(orderitem[i].id, orderitem[i].count, orderitem[i].unitprice, orderitem[i].product_id, orderitem[i].id)
            this.orderitem.push(orderitems);
        }
    }
}
