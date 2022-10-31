import { SubCategories } from './sub-categories';
import { iProducts } from './../interfaces/i-products';

export class Products implements iProducts{
    id:number
    name:string;
    desc:string;
    price:number;
    stock:number;
    sub_categories_id: number;
    sub_categories: SubCategories;

    constructor(id:number, name:string, desc:string, price:number, stock:number, sub_categories_id: number, sub_categories: SubCategories){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.stock = stock;
        this.sub_categories_id = sub_categories_id;
        this.sub_categories = new SubCategories(sub_categories.id, sub_categories.name, sub_categories.id ,sub_categories.categories);
    }


}
