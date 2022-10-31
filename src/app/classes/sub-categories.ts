import { Categories } from './categories';
import { iSubCategories } from './../interfaces/i-sub-categories';

export class SubCategories implements iSubCategories{
    id:number;
    name: string;
    categories_id: number;
    categories: Categories;


    constructor(id:number, name:string, categories_id:number, categories:Categories){
        this.id = id;
        this.name = name;
        this.categories_id = categories_id;
        this.categories = new Categories(categories.id,categories.name);



    }
}
