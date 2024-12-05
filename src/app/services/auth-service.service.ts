import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type LoginRequest from '../interfaces/LoginRequestInterface';
import type TokenResponse from '../interfaces/TokenResponseInterface';
import { Router, type CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements CanActivate {

  private apiUrl = "http://localhost:8080/user/login";

  private http = inject(HttpClient);

  private router = inject(Router);

  private tokenKey = "token";

  login(loginRequest: LoginRequest) {

    const authHeader = 'Basic ' + btoa(loginRequest.email + ':' + loginRequest.password);

    const headers = new HttpHeaders().set('Authorization', authHeader);

    return this.http.post<TokenResponse>(this.apiUrl, {}, { headers });
  }

  saveToken(tokenn: TokenResponse): void {
    let token = tokenn.token;
    const expirationTime = Date.now() + tokenn.expiresAt * 1000;
    localStorage.setItem(this.tokenKey, JSON.stringify({ token, expirationTime }));
    this.router.navigateByUrl('/home');
  }

  isTokenExpired(): boolean {
    const tokenData = JSON.parse(localStorage.getItem(this.tokenKey) || '{}');
  
    if (!tokenData || !tokenData.expirationTime) {
      return true; 
    }
  
    return Date.now() > tokenData.expirationTime; 
  }
  

  getToken(): string | null {
    const tokenData = JSON.parse(localStorage.getItem(this.tokenKey) || '{}');
  
    if (this.isTokenExpired()) {
      this.removeToken(); 
      return null;
    }
  
    return tokenData.token || null; 
  }
  

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  canActivate(): boolean {
    if (this.isTokenExpired()) {
      this.router.navigateByUrl('/login');
      this.removeToken();
      return false;
    }
    return true;
  }
  
}
