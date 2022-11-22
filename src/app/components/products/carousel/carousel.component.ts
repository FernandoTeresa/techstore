import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(public productservice: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.productservice.requestProducts();

  }

  image(productId:number){

    let image = this.products.find((item)=>item.id === productId)

    if (!image){
      return "";
    }

    if (!image.products_images){
      return "../../../../assets/no-image.jpg"
    }

    return 'http://localhost:8080/'+image.products_images[0].images;
  }


  requestInfoProduct(productId: number){
    if(!productId){
      this.router.navigate(['/']);
    }

    this.router.navigate(['product/'+productId]);
  }



}
