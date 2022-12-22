import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartFormComponent } from './components/cart-form/cart-form.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';


@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent,
    CartFormComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  exports: [
    CartComponent,
    CartItemComponent,
    CartFormComponent,
  ]
})
export class CartModule { }
