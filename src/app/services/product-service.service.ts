import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type Product from '../interfaces/ProductInterface';
import type { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import type ProductRequest from '../interfaces/ProductRequestInterface';

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
  

  registerProduct(product: ProductRequest){

    let token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    let formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("value", product.value.toString());
    formData.append("quantity", product.quantity.toString());
    formData.append("image", product.image);
    
    this.httpClient.post(this.url, formData, {headers} ).subscribe();
  }

  getProductByName(name: string){
    let token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.httpClient.get<Product[]>(this.url + "/byName/" + name, {headers});
  }

  getProductById(product_id: string){
    let token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.httpClient.get<Product>(this.url + "/byId/" + product_id, {headers});
  }

  getProductsByOwner(){

    let token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.httpClient.get<Product[]>(this.url + "/user" , {headers});
  }
}
