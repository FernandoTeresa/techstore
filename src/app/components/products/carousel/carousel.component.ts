import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/classes/products';
import { ProductsImages } from 'src/app/classes/products-images';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  public get products(): Products[] {
    return this.productservice.products;
  }

  public get images(): ProductsImages[] {
    return this.productservice.images;
  }

  constructor(public productservice: ProductsService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  image(id:number){

    //fazer localstorage dos favoritos os ultimos 3

    let image = this.images.find(item=>item.product_id === id);
    return 'http://localhost:8080/'+image?.images;
  }



}
