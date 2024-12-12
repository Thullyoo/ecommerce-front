import { inject, Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import type CardItemResponse from '../interfaces/CardItemResponseInterface';
import type CartItemRequest from '../interfaces/CartItemRequest';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  authService = inject(AuthServiceService);

  httpClient = inject(HttpClient);

  url = "http://localhost:8080/cart";
  
  getCartItems(){

    let token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.httpClient.get<CardItemResponse[]>(this.url, {headers});
  }
 
  addCartItem(request: CartItemRequest){
    let token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    this.httpClient.post(this.url + "/add", request, {headers}).subscribe();
  }
}
