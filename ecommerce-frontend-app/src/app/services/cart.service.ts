import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { OrderItem } from '../models/OrderItem';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProductList: OrderItem[] = [];
  cartSubtotal: number = 0;
  cartTotal: number = 0;

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

    this.calculateSubtotal(this.cartProductList);
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

    this.calculateSubtotal(this.cartProductList);
  }

  removeProduct(productItem: OrderItem): void {
    this.cartProductList = this.cartProductList.filter(
      item => item.product.id !== productItem.product.id
    )

    this.calculateSubtotal(this.cartProductList);
  }

  calculateSubtotal(cartItemList: OrderItem[]): number {
    this.cartSubtotal = 0;

    cartItemList.forEach(productItem => {
      this.cartSubtotal += productItem.amount * productItem.unitPrice;
    });

    return this.cartSubtotal;
  }

  calculateTotal(deliveryFee: number): number {
    this.cartTotal = this.cartSubtotal + Number(deliveryFee);
    return this.cartTotal;
  }

  cartChanges() {
    this.getCartItem().subscribe((productItem: OrderItem) => {
      if (productItem.amount < 1) {
        this.removeProduct(productItem);
        this.cartProductList = this.getCartList();
      } else {
        this.updateCart(productItem)
      }
      this.cartSubtotal = this.calculateSubtotal(this.cartProductList);
    })
  }
}
