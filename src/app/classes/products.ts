import { ProductsImages } from 'src/app/classes/products-images';
import { Categories } from './categories';
import { SubCategories } from './sub-categories';
import { iProducts } from './../interfaces/i-products';

export class Products implements iProducts{
    id:number
    name:string;
    desc:string;
    price:number;
    stock:number;
    products_images:ProductsImages[]=[];
    sub_categories?: SubCategories;
    categories?: Categories;

    constructor(id:number, name:string, desc:string, price:number, stock:number, product_images:ProductsImages[], sub_categories?: SubCategories, categories?: Categories){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.stock = stock;
        this.products_images = [];
        for (let i=0;i<product_images.length;i++){
            let array = new ProductsImages(product_images[i].id, product_images[i].images, product_images[i].product_id);
            this.products_images.push(array);
        }
        this.categories = categories;
        this.sub_categories = sub_categories;
    }


}
