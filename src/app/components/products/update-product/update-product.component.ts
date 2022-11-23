import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import { Categories } from './../../../classes/categories';
import { SubCategories } from './../../../classes/sub-categories';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/classes/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  constructor(public productservice: ProductsService, private activatedroute: ActivatedRoute, public router:Router, public userservice:UserService) { }

  private _product: Products |null = null;
 
  public get product(): Products | null{
    return this._product;
  }

  public set product(value: Products |null) {
    this._product = value;
  }

  public get subcategories():SubCategories[]{
    return this.productservice.subcategories;
  }

  public get user():User |null{
    return this.userservice.user;
  }

  ngOnInit(): void {

    if (!this.user){
      this.router.navigate(['/'])
      return
    }
    this.productservice.requestSubCategories()

    this.activatedroute.paramMap.subscribe((params: any) => {
      const id = +params.get('id');

      this.productservice.getProduct(id).subscribe((res:Products) => {
          
        this.product= new Products (res.id, res.name, res.desc, res.price, res.stock, res.products_images, res.sub_categories);
      });

    })

  }

  updateProduct(value: Products){

    console.log(value)
    if (!this.product){
      return "not exist";
    }

    this.productservice.updateProduct(value, this.product.id);
    this.router.navigate(['/product/'+this.product.id]);
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

    return 'http://localhost:8080/'+name;
  }

}
