import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ListProductsComponent } from './components/products/list-products/list-products.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProfileComponent } from './components/profile/profile.component';
import { CarouselComponent } from './components/products/carousel/carousel.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { CartItemsComponent } from './components/cart/cart-items/cart-items.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { NgxPrintModule } from 'ngx-print';
import { OrderComponent } from './components/orders/order/order.component';
import { ListordersComponent } from './components/orders/listorders/listorders.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { CategoriesComponent } from './components/categories/categories/categories.component';
import { SubCategoriesComponent } from './components/sub-categories/sub-categories/sub-categories.component';
import { FavoritesComponent } from './components/products/favorites/favorites.component';
import { ListCategoriesComponent } from './components/categories/list-categories/list-categories.component';
import { ListSubCategoriesComponent } from './components/sub-categories/list-sub-categories/list-sub-categories.component';
import { SidebarComponent } from './components/sidebar/categories/sidebar.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './components/search/search/search.component';
import { ListComponent } from './components/search/list/list.component';
import { FilterComponent } from './components/search/filter/filter.component';
import { MultirangeComponent } from './components/search/multirange/multirange.component';
import { MatSliderModule } from '@angular/material/slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SubcategoriesComponent } from './components/sidebar/subcategories/subcategories.component';
import { SidenavUserComponent } from './components/sidebar/sidenav-user/sidenav-user.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    ListProductsComponent,
    UpdateProductComponent,
    ProfileComponent,
    CarouselComponent,
    ProductDetailsComponent,
    CartComponent,
    CartItemsComponent,
    CheckoutComponent,
    InvoiceComponent,
    OrderComponent,
    ListordersComponent,
    AddProductComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    FavoritesComponent,
    ListCategoriesComponent,
    ListSubCategoriesComponent,
    SidebarComponent,
    FilterComponent,
    SearchComponent,
    ListComponent,
    MultirangeComponent,
    SubcategoriesComponent,
    SidenavUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSliderModule,
    FormsModule,
    TooltipModule.forRoot(),
    NgxPrintModule,
    NgxSliderModule,
    NgbCollapseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
