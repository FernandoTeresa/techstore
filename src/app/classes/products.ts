import { Categories } from './categories';
import { SubCategories } from './sub-categories';
import { iProducts } from './../interfaces/i-products';

export class Products implements iProducts{
    id:number
    name:string;
    desc:string;
    price:number;
    stock:number;
    sub_categories?: SubCategories;
    categories?: Categories;

    constructor(id:number, name:string, desc:string, price:number, stock:number, sub_categories?: SubCategories, categories?: Categories){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.stock = stock;
        this.categories = categories;
        this.sub_categories = sub_categories;
    }


}
