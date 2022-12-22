import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  paymentDetailsForm: FormGroup = {} as FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService
  ) { }

  items: OrderItem[] = this.cartService.getCartList();
  totalPrice: number = this.cartService.cartTotal;

  ngOnInit(): void {
    this.items = this.cartService.getCartList();
    this.totalPrice = this.cartService.calculateTotal(this.items);

    this.initializeForm();
  }

  initializeForm() {
    this.paymentDetailsForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
    });
  }

  validateAllFormFields() {
    Object.keys(this.paymentDetailsForm.controls).forEach(field => {
      const control = this.paymentDetailsForm.get(field);
      control!.markAsTouched();
    });
  }

  submitForm(): void {
    if (this.paymentDetailsForm.invalid) {
      this.validateAllFormFields();
      return;
    }

    this.fullName = this.paymentDetailsForm.value.fullName;
    this.router.navigate(['/confirmation', { fullName: this.fullName }]);
    this.paymentDetailsForm.reset();
  }

  get FullName() {
    return this.paymentDetailsForm.get('fullName');
  }

  cartTotalPrice() {
    return this.cartService.cartTotal;
  }
}
