import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class SalesServiceService {

  private url = "http://localhost:8080/sales";

  httpClient = inject(HttpClient);

  authService = inject(AuthServiceService);

  getSales(){

    let token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get(this.url, {headers});

  }
}
