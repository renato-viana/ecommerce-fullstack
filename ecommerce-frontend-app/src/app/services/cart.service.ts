import { Injectable } from '@angular/core';
import { OrderItem } from '../models/OrderItem';
import { Subject, Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProductList: OrderItem[] = [];
  cartTotal = 0;

  subject = new Subject<OrderItem>();

  constructor() { }

  getCartList(): OrderItem[] {
    return this.cartProductList;
  }

  getCartItem(): Observable<OrderItem> {
    return this.subject.asObservable();
  }

  sendCartItem(productItem: OrderItem) {
    this.subject.next(productItem);
  }

  addToCart(product: Product, amount: number) {

    let productExists = false;

    for (let i in this.cartProductList) {
      if (this.cartProductList[i].product.id === product.id) {
        this.cartProductList[i].amount = amount;
        productExists = true;
        break;
      }
    }

    if (!productExists) {
      this.cartProductList.push(this.productToOrderItem(product, amount));
    }

    this.calculateTotal(this.cartProductList);
  }

  private productToOrderItem(product: Product, amount: number): OrderItem {
    let totalPrice = product.price * amount;
    let orderItem = new OrderItem(product.id, amount, product.price, totalPrice, product)
    return orderItem;
  }

  updateCart(productItem: OrderItem) {

    let productExists = false;

    for (let i in this.cartProductList) {
      if (this.cartProductList[i].product.id === productItem.id) {
        this.cartProductList[i].amount = productItem.amount;
        productExists = true;
        break;
      }
    }

    if (!productExists) {
      this.cartProductList.push(productItem);
    }

    this.calculateTotal(this.cartProductList);
  }

  removeProduct(productItem: OrderItem): void {
    this.cartProductList = this.cartProductList.filter(
      item => item.product.id !== productItem.product.id
    )

    this.calculateTotal(this.cartProductList);
  }

  calculateTotal(cartItemList: OrderItem[]): number {
    this.cartTotal = 0;

    cartItemList.forEach(productItem => {
      this.cartTotal += productItem.amount * productItem.unitPrice;
    });

    return this.cartTotal;
  }

}
