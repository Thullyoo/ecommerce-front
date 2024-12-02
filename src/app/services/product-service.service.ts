import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type Product from '../interfaces/ProductInterface';
import type { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private httpClient: HttpClient = inject(HttpClient);

  private url: string = "http://localhost:8080/product"

  private authService = inject(AuthServiceService)

  getProducts(): Observable<Product[]> {

    let token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.httpClient.get<Product[]>(this.url, { headers });
  }
  
}
