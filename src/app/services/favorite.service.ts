import { ProductsService } from 'src/app/services/products.service';
import { Favorite } from './../classes/favorite';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FavoriteService {

  favorites:Favorite[]=[];


  constructor(public productservice:ProductsService) { }

  saveFavorites(){
    localStorage.setItem('favorite',JSON.stringify(this.favorites));
  }


  addFavorite(favorite:Favorite){
    
    const exist = this.favorites.some((item)=>{
      return item.productId === favorite.productId;
    });

    if (exist){
      return 
    }else{
      this.favorites.push(favorite);

    }
    this.saveFavorites();
  }

  getFavorites(){
    return this.favorites;
  }

  loadFavorites(){
    let favorite = localStorage.getItem('favorite');

    if (favorite){
      return this.favorites = JSON.parse(favorite);
    }else{
      return this.favorites = [];
    }

  }

  removeFavorite(id:number){
    const index = this.favorites.findIndex((item:Favorite)=>item.productId === id);

    console.log(index);

    if (index>-1){
      this.favorites.splice(index,1);
      this.saveFavorites();
    }
  }

  productFavorite(favorite: Favorite){
    return this.favorites.findIndex((item:Favorite) => item.productId === favorite.productId) > -1;
  }

  clearFavorites(){
    this.favorites = [];
    localStorage.removeItem('favorite');
  }


}
