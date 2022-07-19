import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { UserService } from 'src/app/utility/services/user/user.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  isLoading = true;
  order: any;
  user: any;
  orderProducts: [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let order_id = null;
    if (this.activatedRoute.snapshot.params['id']) order_id = this.activatedRoute.snapshot.params['id'];

    if (order_id != null) {
      let token = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));

      if (token == null) return;

      this.userService.findById(token.id).subscribe((res: any) => {
        this.user = res.data.user;
        this.userService.findOrderById(order_id).subscribe((res: any) => {
          this.order = res.data.order;
          this.orderProducts = res.data.orderProducts;
          this.order.orderItems.forEach(item => {
            item.product = this.orderProducts.find((product: any) => product.id == item.product);
          });
          this.isLoading = false;
        });
      });
    }
  }
}
