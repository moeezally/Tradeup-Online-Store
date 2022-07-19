import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/utility/services/product/product.service';
import { UserService } from 'src/app/utility/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  orders: any[] = [];

  products: any[] = [];

  totalOrdersCost = 0;

  productsBought = 0;

  isLoading = true;

  constructor(private userService: UserService, private productService: ProductService) {}

  ngOnInit(): void {
    let token = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));

    if (token == null) return;

    this.userService.findById(token.id).subscribe((res: any) => {
      this.user = res.data.user;
      this.isLoading = false;
    });
    this.userService.findUserOrders(token.id).subscribe((res: any) => {
      this.orders = res.data.orders;
      this.productService.findActive().subscribe((res: any) => {
        this.products = res.data.products;
        this.orders.forEach(order => {
          order.orderItems.forEach(orderItem => {
            orderItem.product = this.products.find(pro => pro.id == orderItem.product);
            this.productsBought += orderItem.quantity;
          });
          this.totalOrdersCost += order.orderPrice;
        });
      });
      console.log(this.productsBought);
    });
  }
}
