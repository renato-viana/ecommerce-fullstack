import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderItem } from 'src/app/models/OrderItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProductList: OrderItem[] = [];
  cartTotal: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartList();

    this.cartChanges();
  }

  private getCartList() {
    this.cartProductList = this.cartService.getCartList();
    this.cartTotal = this.cartService.calculateTotal(this.cartProductList);
    return this.cartProductList;
  }

  private cartChanges() {
    this.cartService.getCartItem().subscribe((productItem: OrderItem) => {
      if (productItem.amount < 1) {
        this.cartService.removeProduct(productItem);
        this.cartProductList = this.cartService.getCartList();
      } else {
        this.cartService.updateCart(productItem)
      }
      this.cartTotal = this.cartService.calculateTotal(this.cartProductList);
    })
  }

}
