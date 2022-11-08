import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FileUploadComponent } from './components/products/file-upload/file-upload.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ListProductsComponent } from './components/products/list-products/list-products.component';
import { ProductComponent } from './components/products/product/product.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './components/profile/profile.component';
import { CarouselComponent } from './components/products/carousel/carousel.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { CartItemsComponent } from './components/cart/cart-items/cart-items.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import {NgxPrintModule} from 'ngx-print';
import { OrderComponent } from './components/orders/order/order.component';
import { ListordersComponent } from './components/orders/listorders/listorders.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    FileUploadComponent,
    NotFoundComponent,
    ListProductsComponent,
    ProductComponent,
    UpdateProductComponent,
    SidebarComponent,
    ProfileComponent,
    CarouselComponent,
    ProductDetailsComponent,
    CartComponent,
    CartItemsComponent,
    CheckoutComponent,
    InvoiceComponent,
    OrderComponent,
    ListordersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TooltipModule.forRoot(),
    NgxPrintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
