import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {

  product!: Product;
  isLoaded: boolean = false;
  errorLoading: boolean = false;
  selectedAmount: number;
  isShown: boolean = false;

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

  constructor(private cartService: CartService, public activatedRoute: ActivatedRoute, private productService: ProductService) {
    this.selectedAmount = 1;
  }

  ngOnInit(): void {

    this.loadProduct();

  }

  loadProduct(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getProduct(Number(productId))
      .pipe(take(1))
      .subscribe(
        res => this.onSuccess(res),
        _error => this.onError()
      );
  }

  // Workaround undefined
  onSuccess(res: Product): void {
    if (res === undefined) {
      this.errorLoading = true;
    } else {
      this.product = res;
      this.isLoaded = true
    }
  }

  onError(): void {
    this.errorLoading = true;
  }

  addToCart(product: Product, amount: number): void {
    this.cartService.addToCart(product, amount);
    this.isShown = !this.isShown;

    setTimeout(() => {
      this.isShown = !this.isShown;
    }, 1000);
  }

}
