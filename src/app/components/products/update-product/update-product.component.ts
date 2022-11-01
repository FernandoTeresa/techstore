import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/classes/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  constructor(public productservice: ProductsService) { }


  ngOnInit(): void {
  }

  updateProduct(value: Products){
    let productId = 2; //para teste
      this.productservice.updateProduct(value, productId);
  }

  getProducts(){
    this.productservice.requestProducts();
  }

}
