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
  { path: 'update/:id', component: UpdateProductComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
