import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  DATA_URL = environment.DATA_URL;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    // Simulate error
    // const error = throwError(new Error());
    // return timer(3000).pipe(mergeMap(() => error));
    return this.http.get<Product[]>(`${this.DATA_URL}/products`);
  }

  getProduct(id: number): Observable<Product> {
    const product = this.http.get<Product>(`${this.DATA_URL}/products/${id}`);

    return product;
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.DATA_URL}/products`, product);
  }

  deleteProduct(id: number): void {
    this.http.delete<Product>(`${this.DATA_URL}/products/${id}`);
  }

}
