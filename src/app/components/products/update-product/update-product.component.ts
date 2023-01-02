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
    this.productservice.requestSubCategories().subscribe((res: SubCategories[]) => {
      
      this.productservice.setSubCategories(res)

    });

    this.activatedroute.paramMap.subscribe((params: any) => {
      const id = +params.get('id');

      this.productservice.getProduct(id).subscribe((res:Products) => {

        console.log(res)
          
        this.product= new Products (res.id, res.name, res.desc, res.price, res.stock, res.products_images, res.sub_categories, res.categories);
      });

    })

  }

  updateProduct(value: Products){

    if (!this.product){
      return "not exist";
    }

    this.productservice.updateProduct(value, this.product.id).subscribe((res:Products)=>{    

    },(err) => {
      switch(err.status){
        case 400:
          alert('ERROR!! Bad Request');
          break;
        case 401:
          alert('ERROR!! Unauthorized');
          break;
        case 403:
          alert('ERROR!! Forbidden');
          break;
        case 404:
          alert('ERROR!! Not Found');
          break;
        case 500:
          alert('ERROR!! Server Error');
          break;
        default:
          alert ('Unknow Error!!');
          break;
      }
    });
    
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
