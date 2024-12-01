import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type Product from '../interfaces/ProductInterface';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private httpClient: HttpClient = inject(HttpClient);

  private url: string = "http://localhost:8080/product"

  getProducts(): Observable<Product[]> {
      return this.httpClient.get<Product[]>(this.url);
  }
  
}
