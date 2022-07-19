import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/utility/services/user/user.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  Local_Storage: any[];
  isLoading: Boolean = true;
  TotalCartPrice: number;

  OrderObj: any = {};

  Page: number = 1;
  ItemsPerPage: number = 9;
  user: any = {};

  constructor(private cartService: CartService, private userService: UserService) {}

  ngOnInit(): void {
    this.Local_Storage = this.cartService.getCartItems();
    this.TotalCartPrice = this.cartService.getTotalCartPrice();
    let token;
    if (localStorage.getItem('token') != null) {
      token = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
      this.userService.findById(token.id).subscribe((res: any) => {
        this.user = res.data.user;
        this.OrderObj.name = this.user.name;
        this.OrderObj.email = this.user.email;
        this.OrderObj.delivery_address = this.user.address;
        this.OrderObj.phoneNumber = this.user.mobile_number;
      });
    }
    this.isLoading = false;
  }

  placeOrder() {
    let StoreOrderObj: any = {};

    if (localStorage.getItem('token')) {
      let token = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));

      let numberOfItems = 0;
      this.Local_Storage.forEach(item => {
        numberOfItems += item.quantity;
      });

      this.Local_Storage.forEach(item => {
        item.product = item.product.id;
      });

      StoreOrderObj.user = token.id;
      StoreOrderObj.orderPrice = this.TotalCartPrice;
      StoreOrderObj.numberOfItems = numberOfItems;
      StoreOrderObj.deliveryAddress = this.OrderObj.delivery_address;
      StoreOrderObj.orderItems = this.Local_Storage;

      console.log(StoreOrderObj);
      this.cartService.placeOrder(StoreOrderObj).subscribe((res: any) => {
        console.log(res);
      });
      alert(
        this.OrderObj.name +
          ' your order has been placed. It will be delivered to ' +
          this.OrderObj.delivery_address +
          '.'
      );
      this.cartService.emptyCart();
    }
  }
}
