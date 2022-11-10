import { CartService } from 'src/app/services/cart.service';
import { ProductsImages } from './../../../classes/products-images';
import { SubCategories } from './../../../classes/sub-categories';
import { Categories } from './../../../classes/categories';
import { Products } from 'src/app/classes/products';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/classes/cart';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  constructor(public productservice: ProductsService, public router:Router, public cartservice:CartService) { }

  public get products(): Products[] {
    return this.productservice.products;
  }

  cart: Cart[] = []; 

  ngOnInit(): void {
      this.productservice.getProducts().subscribe((res: Products[]) => {
        for (let i=0;i<res.length;i++){
          let array = new Products(res[i].id,res[i].name, res[i].desc, res[i].price, res[i].stock, res[i].products_images);
          this.products.push(array);
        }
        
      });

      this.cart = this.cartservice.loadCart()
  }

  background(id: number) {

    let product = this.products.find(item=>item.id === id);

    if (!product?.products_images){
      return
    }
    for(let i =0; i<product.products_images.length;i++){
      return 'http://localhost:8080'+product.products_images[i].images;
    }
    
  }

  productDetail(id: number){
    this.router.navigate(['/product/'+id]);
  }

  addCart(id:number){
    
    let find = this.cart.find((item)=>item.productId === id)

    if (!find){
      return
    }
    let objCart:Cart = {
      count:find.count,
      productId: find.productId
      
    }

    this.cartservice.addToCart(objCart);
  }


}
