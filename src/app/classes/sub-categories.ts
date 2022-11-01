import { Categories } from './categories';
import { iSubCategories } from './../interfaces/i-sub-categories';

export class SubCategories implements iSubCategories{
    id:number;
    name: string;
    categories: Categories;


    constructor(id:number, name:string, categories:Categories){
        this.id = id;
        this.name = name;
        this.categories = new Categories(categories.id,categories.name);



    }
}
