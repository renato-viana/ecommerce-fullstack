import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app.routing.module';

import { AboutComponent } from '../../pages/about/about.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { ProductItemDetailComponent } from './product-item-detail/product-item-detail.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductCatalogComponent,
    AboutComponent,
    ProductItemDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  exports: [
    ProductCatalogComponent
  ]
})
export class ProductsModule { }
