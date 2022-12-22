import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderItem } from 'src/app/models/OrderItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  cartProductList: OrderItem[] = []
  cartTotal: number = 0
  fullName: string | null = ""

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cartProductList = this.cartService.getCartList();
    this.cartTotal = this.cartService.cartTotal;
    this.fullName = this.route.snapshot.paramMap.get('fullName');
  }

}
