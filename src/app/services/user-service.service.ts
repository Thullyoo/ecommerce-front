import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import type UserGetById from '../interfaces/UserGetByIdInterface';
import type UserResgisterRequest from '../interfaces/UserRegisterRequestInterface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private url = "http://localhost:8080/user";

  private httpClient = inject(HttpClient);

  private authService = inject(AuthServiceService);

  getUserById(){
    
    let token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.httpClient.get<UserGetById>(this.url + "/infoId", {headers});
  }

  registerUser(request: UserResgisterRequest){

    return this.httpClient.post(this.url + "/register", request);

  }
}
