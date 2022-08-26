import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderItem } from 'src/app/models/OrderItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.css']
})
export class CartFormComponent implements OnInit {

  fullName: string = '';
  address: string = '';
  cardNumber: string = '';

  constructor(private router: Router, private cartService: CartService) { }

  items: OrderItem[] = this.cartService.getCartList();
  totalPrice: number = this.cartService.cartTotal;

  ngOnInit(): void {
    this.items = this.cartService.getCartList();
    this.totalPrice = this.cartService.calculateTotal(this.items);
  }

  submitForm(): void {
    this.fullName = '';
    this.address = '';
    this.cardNumber = '';

    this.router.navigate(['/confirmation']);
  }
}
