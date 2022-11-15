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

  public get products(): Products[] {
    return this.productservice.products;
  }

  favorites:Favorite[]=[];

  ngOnInit(): void {


  }


}
