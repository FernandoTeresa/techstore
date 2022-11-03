import { ProductComponent } from './../product/product.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/classes/products';
import { ProductsImages } from 'src/app/classes/products-images';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

 private _product: Products |null = null;
 
  public get product(): Products | null{
    return this._product;
  }

  public set product(value: Products |null) {
    this._product = value;
  }

  constructor(public productservice:ProductsService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params: any) => {
      const id = +params.get('id');

      this.productservice.getProduct(id).subscribe((res:Products) => {
          
        this.product= new Products (res.id, res.name, res.desc, res.price, res.stock, res.products_images);

      });
    })
  }


  cartButton(product:Products){
    this.productservice.addToCart(product);
    alert("added to cart");
  }

  img(name:string){
    
    return 'http://localhost:8080/'+name;
   
  }



}