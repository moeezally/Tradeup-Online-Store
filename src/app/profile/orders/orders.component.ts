import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/utility/services/user/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  isLoading = true;
  user: any;
  orders: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    let token = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));

    if (token == null) return;
    this.userService.findUserOrders(token.id).subscribe((res: any) => {
      this.orders = res.data.orders;
      this.userService.findById(token.id).subscribe((res: any) => {
        this.user = res.data.user;
        this.isLoading = false;
      });
    });
  }

  openDetails(id: any) {
    console.log(id);
    this.router.navigate(['/home/profile/orders', id]);
  }
}
