import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { CartService } from 'src/app/cart/cart.service';
import { ProductService } from 'src/app/utility/services/product/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  isLoaded: boolean;
  advanceSearchExpanded: boolean = false;
  products: any[] = [];
  productCategories: any[] = [];
  searchText: string = '';
  productCategory: any;
  allProducts: any[] = [];

  Page: number = 1;
  ItemsPerPage: number = 12;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private appService: AppService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['category']) {
      this.productCategory = this.activatedRoute.snapshot.params['category'];

      if (localStorage.getItem('id_token'))
        this.productService.findActive().subscribe((response: any) => {
          this.allProducts = response.data.products;
          this.allProducts.forEach(product => {
            if (product.productCategory.name === this.productCategory) {
              this.products.push(product);
            }
          });
        });
    } else {
      if (localStorage.getItem('id_token'))
        this.productService.findActive().subscribe((response: any) => {
          this.products = response.data.products;
          this.allProducts = response.data.products;
        });
    }

    if (localStorage.getItem('id_token'))
      this.productService.findProductCateories().subscribe((response: any) => {
        this.productCategories = response.data.productCategories;
      });
    this.isLoaded = true;
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
