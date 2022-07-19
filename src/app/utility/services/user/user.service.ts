import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private appService: AppService) {}

  findById(id: any) {
    return this.http.get(this.appService.getApiUrl() + 'store/user/' + id);
  }

  signup(StoreUser: any) {
    return this.http.post(this.appService.getApiUrl() + 'store/signup', StoreUser);
  }

  login(loginObj: any) {
    return this.http.post(this.appService.getApiUrl() + 'store/login', loginObj);
  }

  findUserOrders(id: any) {
    return this.http.get(this.appService.getApiUrl() + 'store/order/user/' + id);
  }

  findOrderById(id: any) {
    return this.http.get(this.appService.getApiUrl() + 'store/order/' + id);
  }

  update(user: any) {
    return this.http.put(this.appService.getApiUrl() + 'store/user', user);
  }
}
