import { iCategories } from './../interfaces/i-categories';

export class Categories implements iCategories{
    id:number;
    name:string;


    constructor(id:number, name:string){
        this.id = id;
        this.name = name;
    }
}
