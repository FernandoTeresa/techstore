import { Categories } from './../../../classes/categories';
import { SubCategories } from './../../../classes/sub-categories';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/classes/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  constructor(public productservice: ProductsService, private activatedroute: ActivatedRoute) { }

  private _product: Products |null = null;
 
  public get product(): Products | null{
    return this._product;
  }

  public set product(value: Products |null) {
    this._product = value;
  }

  subcategories:SubCategories[]=[];

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params: any) => {
      const id = +params.get('id');

      this.productservice.getProduct(id).subscribe((res:Products) => {
          
        this.product= new Products (res.id, res.name, res.desc, res.price, res.stock, res.products_images);
      });

    })

    this.productservice.getSubCategories().subscribe((res:SubCategories[])=>{

      for (let i = 0;i<res.length;i++){
        let array = res[i];
        let subcategorie = new SubCategories(array.id, array.name, array.categories)
        this.subcategories.push(subcategorie);
      }

    })



  }

  updateProduct(value: Products){
    console.log("asnmzbnx cbnzx");

    // if(!this.product){
    //   return;
    // }

    // if (!this.product.sub_categories){
    //   return;
    // }


    //NAO FUNCIONA 

  }

  nameSubcategorie():string{

    if (!this.product){
      return ""
    }

    if(!this.product.sub_categories){
      return ""
    }

    return this.product.sub_categories.name
  }


  image(name:string){

    //fazer localstorage dos favoritos os ultimos 3

    // if (!product){
    //   return
    // }

    return 'http://localhost:8080/'+name;
  }

}
