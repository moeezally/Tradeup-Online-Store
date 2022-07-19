import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  isLoading = true;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    let id = null;
    if (this.activatedRoute.snapshot.params['id']) {
      id = this.activatedRoute.snapshot.params['id'];
    }

    if (localStorage.getItem('id_token'))
      this.http
        .get(this.appService.getApiUrl() + 'api/product/' + id, {
          headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('id_token')}` })
        })
        .subscribe((response: any) => {
          this.product = response.data.product;
          console.log(response);
          this.isLoading = false;
        });
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
