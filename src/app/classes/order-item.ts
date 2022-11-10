import { Products } from 'src/app/classes/products';
import { iOrderItem } from "../interfaces/i-order-item";

export class OrderItem implements iOrderItem{
    id:number;
    count:number;
    unitprice: number;
    product_id:number;
    product:Products;
    order_id:number;


    constructor(id:number, count:number, unitprice:number, product_id:number,product:Products, order_id:number){
        this.id = id;
        this.count = count;
        this.unitprice = unitprice;
        this.product_id = product_id;
        this.product= new Products(product.id, product.name, product.desc, product.price, product.stock, product.products_images);
        this.order_id = order_id;

    }

}
