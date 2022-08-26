import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/models/OrderItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem!: OrderItem;

  amount!: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.amount = this.cartItem.amount;
  }

  recalculateTotal(cartItem: OrderItem): void {
    console.log(this.amount)
    cartItem.amount = this.amount;
    this.cartService.cartTotal = this.amount * cartItem.unitPrice;
    this.cartService.sendCartItem(cartItem);
    this.cartService.cartChanges();
  }

}
