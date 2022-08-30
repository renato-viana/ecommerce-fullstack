import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { ProductItemDetailComponent } from './product-item-detail/product-item-detail.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductCatalogComponent,
    ProductItemDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ProductComponent,
    ProductCatalogComponent,
    ProductItemDetailComponent
  ]
})
export class ProductsModule { }
