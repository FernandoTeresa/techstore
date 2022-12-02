import { FavoritesComponent } from './components/products/favorites/favorites.component';
import { SubCategoriesComponent } from './components/sub-categories/sub-categories/sub-categories.component';
import { CategoriesComponent } from './components/categories/categories/categories.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { OrderComponent } from './components/orders/order/order.component';
import { ListordersComponent } from './components/orders/listorders/listorders.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './components/products/list-products/list-products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { SearchComponent } from './components/search/search/search.component';
import { ListComponent } from './components/search/list/list.component';

const routes: Routes = [
  { path: '', component: ListProductsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'navbar', component: NavbarComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'product/:id', component: ProductDetailsComponent},
  { path: 'cart', component: CartComponent},
  { path: 'checkout', component:CheckoutComponent},
  { path: 'invoice', component:InvoiceComponent},
  { path: 'listorders', component:ListordersComponent},
  { path: 'order/:id', component:OrderComponent},
  { path: 'update/:id', component: UpdateProductComponent},
  { path: 'addProduct', component: AddProductComponent},
  { path: 'addCategory', component:CategoriesComponent},
  { path: 'addSubCategory', component:SubCategoriesComponent},
  { path: 'favorites', component:FavoritesComponent},
  { path: 'search', component:ListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
