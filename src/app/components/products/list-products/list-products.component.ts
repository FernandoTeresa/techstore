import { CartService } from 'src/app/services/cart.service';
import { ProductsImages } from './../../../classes/products-images';
import { SubCategories } from './../../../classes/sub-categories';
import { Categories } from './../../../classes/categories';
import { Products } from 'src/app/classes/products';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/classes/cart';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  constructor(public productservice: ProductsService, public router:Router, public cartservice:CartService, public userservice:UserService) { }

  public get products(): Products[] {
    return this.productservice.products;
  }

  cart: Cart[] = []; 

  private _user: User | null = null;

  public get user(): User | null {
    return this._user;
  }
  public set user(value: User | null) {
    this._user = value;
  }

  ngOnInit(): void {
      this.user = this.userservice.getUser();

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

  edit(id:number){
    this.router.navigate(['/update/'+id]);
  }

  remove(id:number){
    this.productservice.removeProduct(id);
  }


}
