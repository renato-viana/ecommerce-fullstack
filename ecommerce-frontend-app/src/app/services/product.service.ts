import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  DATA_URL = environment.DATA_URL;
  TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpudWxsLCJpYXQiOjE2NjAwNTA4OTV9.LxDsx1SR18f4oinqRt8zC7yZ57a8WSwN51ZyJoVbx-I';

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.TOKEN
    })
  };

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
    return this.http.post<Product>(`${this.DATA_URL}/products`, product, this.httpOptions);
  }

  deleteProduct(id: number): void {
    this.http.delete<Product>(`${this.DATA_URL}/products/${id}`, this.httpOptions);
  }

}
