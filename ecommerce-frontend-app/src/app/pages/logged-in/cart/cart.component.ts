import { Component, OnInit } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { OrderItem } from 'src/app/models/OrderItem';

import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProductList: OrderItem[] = [];
  cartSubtotal: number = 0;
  faLongArrowAltLeft = faLongArrowAltLeft;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartList();

    this.cartChanges();

  }

  private getCartList() {
    this.cartProductList = this.cartService.getCartList();
  }

  private cartChanges() {
    this.cartService.getCartItem().subscribe((productItem: OrderItem) => {
      if (productItem.amount < 1) {
        this.cartService.removeProduct(productItem);
        this.cartProductList = this.cartService.getCartList();
      } else {
        this.cartService.updateCart(productItem)
      }
      this.cartSubtotal = this.cartService.calculateSubtotal(this.cartProductList);
    })
  }

  cartQuantityItems(): number {
    return this.cartService.cartProductList.reduce((accumulator, item) => {
      return accumulator += item.amount
    }, 0);
  }

}
