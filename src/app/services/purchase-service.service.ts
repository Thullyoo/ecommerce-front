import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseServiceService {

  httpClient = inject(HttpClient);

  authService = inject(AuthServiceService);

  url = "http://localhost:8080/purchase"

  purchase(){

    let token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.httpClient.post(this.url, null, {headers});
  }
}
