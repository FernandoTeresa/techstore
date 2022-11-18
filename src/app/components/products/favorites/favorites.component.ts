import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FavoriteService } from './../../../services/favorite.service';
import { Products } from 'src/app/classes/products';
import { Favorite } from './../../../classes/favorite';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(public productservice: ProductsService, public favoriteservice:FavoriteService) { }


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


}
