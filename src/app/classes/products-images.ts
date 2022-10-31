import { iProductsImages } from './../interfaces/i-products-images';

export class ProductsImages implements iProductsImages{
    id:number;
    images: string;
    product_id: number;

    constructor(id:number,images: string, product_id: number ){
        this.id = id;
        this.images = images;
        this.product_id = product_id;
        
    }

}
