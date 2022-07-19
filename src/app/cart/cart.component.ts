import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  Local_Storage: any[];
  isLoading = true;
  TotalCartPrice: number;

  Page: number = 1;
  ItemsPerPage: number = 9;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    if (localStorage.getItem('cart') != null) {
      this.Local_Storage = JSON.parse(localStorage.getItem('cart'));
      this.TotalCartPrice = this.cartService.getTotalCartPrice();
    } else {
      this.Local_Storage = [];
      this.TotalCartPrice = 0;
    }
    this.isLoading = false;
  }

  increaseQuantity(CartItem: any) {
    this.cartService.increaseQuantity(CartItem);
    this.ngOnInit();
  }

  decreaseQuantity(CartItem: any) {
    this.cartService.decreaseQuantity(CartItem);
    this.ngOnInit();
  }
}
