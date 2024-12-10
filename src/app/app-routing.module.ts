import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { HomeComponent } from './components/home/home.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "add-product", component: ProductAddComponent},
  {path: "edit-product/:id", component: ProductEditComponent},
  {path: "add-to-cart/:id", component: AddToCartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
