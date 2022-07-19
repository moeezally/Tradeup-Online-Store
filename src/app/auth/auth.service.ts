import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  public token: string;
  public loggedIn = false;
  loggedInUser: any = {};

  constructor(private appService: AppService, private http: HttpClient, private router: Router) {
    this.loggedIn = !!localStorage.getItem('token');
  }

  login(loginObj: any) {
    return this.http.post(this.appService.getApiUrl() + 'store/login', loginObj);
  }

  tradeupLogin(loginObj: any) {
    return this.http.post(this.appService.getApiUrl() + 'home/login', loginObj);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('cart');
    this.router.navigate(['auth', 'login']);
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}
