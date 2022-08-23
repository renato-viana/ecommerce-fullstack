import { Product } from './Product';

export class OrderItem {
    id: number;
    amount: number;
    unitPrice: number;
    totalPrice: number;
    product: Product;

    constructor(
        id: number,
        amount: number,
        unitPrice: number,
        totalPrice: number,
        product: Product
    ) {
        this.id = id;
        this.amount = amount;
        this.unitPrice = unitPrice;
        this.totalPrice = totalPrice;
        this.product = product
    }
}