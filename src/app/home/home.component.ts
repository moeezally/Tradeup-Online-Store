import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'll-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  particlesOptions = {
    particles: {
      color: {
        value: ['#ffffff', '#ffffff']
      },
      size: {
        value: 1
      },
      lineLinked: {
        enable: true,
        color: 'random'
      },
      move: {
        enable: true,
        speed: 1.5
      }
    }
  };

  productCategories: any[] = [];

  constructor(private http: HttpClient, private appService: AppService) {}

  ngOnInit(): void {
    this.http
      .get(this.appService.getApiUrl() + 'api/product/category/list', {
        headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('id_token')}` })
      })
      .subscribe((response: any) => {
        this.productCategories = response.data.productCategories;
      });
  }
}
