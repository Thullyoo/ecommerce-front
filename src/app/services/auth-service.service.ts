import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type LoginRequest from '../interfaces/LoginRequestInterface';
import type TokenResponse from '../interfaces/TokenResponseInterface';
import { Router, type CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements CanActivate{

  private apiUrl = "http://localhost:8080/user/login"
  
  private http = inject(HttpClient);

  private router = inject(Router)

  login(loginRequest: LoginRequest) {
    
    const authHeader = 'Basic ' + btoa(loginRequest.email + ':' + loginRequest.password);

    const headers = new HttpHeaders().set('Authorization', authHeader);

    return this.http.post<TokenResponse>(this.apiUrl, {}, { headers });
  }

  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): String | null {
    return localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  canActivate() {
    const token = localStorage.getItem('access_token'); 
    if (token) {
      return true; 
    } else {
      this.router.navigateByUrl('/login'); 
      return false;
    }
  }

}
