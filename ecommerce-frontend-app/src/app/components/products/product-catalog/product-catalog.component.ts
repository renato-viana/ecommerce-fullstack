import { Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';

import { Product } from '../../../models/Product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {

  products: Product[] = [];

  isShown: boolean = false;
  isLoaded: boolean = false;
  errorLoading: boolean = false;

  constructor(private productService: ProductService, private cartService: CartService) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadData();
    }, 3000);

  }

  loadData(): void {
    this.productService.getProducts()
      .pipe(
        take(1),
        finalize(() =>
          this.isLoaded = true
        ))
      .subscribe(
        res => this.onSuccess(res),
        _error => this.onError()
      );
  }

  onSuccess(res: Product[]): void {
    this.products = res;
  }

  onError(): void {
    this.errorLoading = true;
  }

  addProduct(): void {
    this.products.push({
      id: 1,
      name: 'Book',
      price: 9.99,
      url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'You can read it!'
    });
  }

  addToProductList(product: Product): void {
    this.products.push(product);
  }

  addToCart(product: Product, amount: number): void {
    this.cartService.addToCart(product, amount);
    this.isShown = !this.isShown;

    setTimeout(() => {
      this.isShown = !this.isShown;
    }, 1000);
  }

  hideProduct(product: Product): void {
    this.products = this.products.filter(b => b.id !== product.id);
  }

}
