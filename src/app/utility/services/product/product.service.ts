import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private appService: AppService, private http: HttpClient) {}

  findActive() {
    return this.http.get(this.appService.getApiUrl() + 'api/product/list/active', {
      headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('id_token')}` })
    });
  }

  findById(id: any) {
    return this.http.get(this.appService.getApiUrl() + 'api/product/' + id, {
      headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('id_token')}` })
    });
  }

  findProductCateories() {
    return this.http.get(this.appService.getApiUrl() + 'api/product/category/list', {
      headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('id_token')}` })
    });
  }
}
