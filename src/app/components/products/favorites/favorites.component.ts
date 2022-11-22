import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FavoriteService } from './../../../services/favorite.service';
import { Products } from 'src/app/classes/products';
import { Favorite } from './../../../classes/favorite';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/classes/cart';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(public productservice: ProductsService, public favoriteservice:FavoriteService, public cartservice:CartService) { }


  public get favorites():Favorite[]{
    return this.favoriteservice.loadFavorites();
  }

  ngOnInit(): void {
    this.productservice.requestProducts();
  }

  getProduct(id:number){

    return this.productservice.products.find((item)=> item.id == id)
   
  }

  getImages(id:number):string{

    let image = this.productservice.products.find((item)=>item.id === id);

    if(!image){
      return "";
    }


    return 'http://localhost:8080'+image.products_images[0].images;

  }

  removeProduct(id:number){
    this.favoriteservice.removeFavorite(id);
  }

  addProductCart(value:any){

    let favoriteToCart:Cart={
      productId: value.productId,
      count: 1
    }
    console.log(favoriteToCart);
    this.cartservice.addToCart(favoriteToCart);
    this.removeProduct(value.productId);
    alert("Added to Cart");
  }


}
