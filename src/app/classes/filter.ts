export class Filter{
    search: string;
    max: number;
    min: number;
    sub_categories_id: number;
    stock: boolean;

    constructor(search: string, max: number, min: number, sub_categories_id: number, stock: boolean){
        this.search = search;
        this.max = max;
        this.min = min;
        this.sub_categories_id = sub_categories_id;
        this.stock = stock;
    }

}