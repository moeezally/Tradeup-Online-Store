import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartService } from 'src/app/cart/cart.service';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'll-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {
  products: any[];
  featuredProducts: any[] = [];
  constructor(private http: HttpClient, private cartService: CartService, private appService: AppService) {}

  ngOnInit(): void {
    this.http
      .get(this.appService.getApiUrl() + 'api/product/list/active', {
        headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('id_token')}` })
      })
      .subscribe((response: any) => {
        this.products = response.data.products;
        this.featuredProducts = this.products.slice(0, 8);
      });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
