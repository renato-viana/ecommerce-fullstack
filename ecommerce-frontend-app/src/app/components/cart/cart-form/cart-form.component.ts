import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.css']
})
export class CartFormComponent {

  fullName: string = '';
  address: string = '';
  cardNumber: string = '';

  constructor(private router: Router) { }

  submitForm(): void {


    this.fullName = '';
    this.address = '';
    this.cardNumber = '';

    this.router.navigate(['/confirmation']);
  }
}
