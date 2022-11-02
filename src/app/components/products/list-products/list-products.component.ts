import { ProductsImages } from './../../../classes/products-images';
import { SubCategories } from './../../../classes/sub-categories';
import { Categories } from './../../../classes/categories';
import { Products } from 'src/app/classes/products';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  constructor(public productservice: ProductsService, private activatedroute: ActivatedRoute) { }

  //public url:any = [];
  //public images:any = [];

  public get products(): Products[] {
    return this.productservice.products;
  }

  public get images(): ProductsImages[] {
    return this.productservice.images;
  }

  public get categories(): Categories[] {
    return this.productservice.categories;
  }

  public get subcategories(): SubCategories[] {
    return this.productservice.subcategories;
  }

  ngOnInit(): void {

    this.activatedroute.paramMap.subscribe((params: any) => {
      const id = +params.get('id');

      this.productservice.getProduct(id).subscribe((res: Products[]) => {

        this.productservice.setProducts(res);

      });

      this.productservice.getImages(id).subscribe((res: ProductsImages[]) => {

        this.productservice.setImages(res);
      });
    });
  }

  background(id: number) {

    let image = this.images.find(item=>item.product_id === id);
    return 'http://localhost:8080/'+image?.images;

  }


}
