import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

import { Product } from '../../../models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  id: number = 0;
  name: string = '';
  price: number = 0;
  url: string = '';
  description: string = '';

  @Input() productItem: Product;

  items = [
    { id: 1, name: 'one' },
    { id: 2, name: 'two' },
    { id: 3, name: 'three' },
    { id: 4, name: 'four' },
    { id: 5, name: 'five' },
    { id: 6, name: 'six' },
    { id: 7, name: 'seven' },
    { id: 8, name: 'eight' },
    { id: 9, name: 'nine' },
    { id: 10, name: 'ten' }
  ]

  selectedAmount: number;

  @Output() addToCart: EventEmitter<{ product: Product, amount: number }> = new EventEmitter;
  @Output() hideProduct: EventEmitter<Product> = new EventEmitter;

  constructor(private productService: ProductService, private router: Router) {
    this.selectedAmount = 1;
    this.productItem = {
      "id": 1,
      "name": "Book",
      "price": 9.99,
      "url": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "description": "You can read it!"
    }
  }

  add(product: Product, amount: number) {
    this.addToCart.emit({ product, amount })
  }

  goToProductDetail(productId: number) {
    this.router.navigate([`products/${productId}`])
  }

  hide(product: Product): void {
    this.hideProduct.emit(product);
  }

}
