import { ProductsImages } from './../../../classes/products-images';
import { SubCategories } from './../../../classes/sub-categories';
import { Categories } from './../../../classes/categories';
import { Products } from 'src/app/classes/products';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  constructor(public productservice: ProductsService, private activatedroute: ActivatedRoute, public router:Router) { }

  public get products(): Products[] {
    return this.productservice.products;
  }

  ngOnInit(): void {
      this.productservice.getProducts().subscribe((res: Products[]) => {
        for (let i=0;i<res.length;i++){
          let array = new Products(res[i].id,res[i].name, res[i].desc, res[i].price, res[i].stock, res[i].products_images);
          this.products.push(array);
        }
        
      });
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
    this.router.navigate(['/product/',id]);
  }


}
