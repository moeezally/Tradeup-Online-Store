import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { UserService } from 'src/app/utility/services/user/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginObj: any = {};
  loginErrors = new Map<any, any>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private appService: AppService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  login() {
    console.log(this.loginObj);

    this.authService.login(this.loginObj).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user_id', JSON.parse(atob(res.token.split('.')[1])).id);

        let id = JSON.parse(atob(res.token.split('.')[1])).id;

        this.userService.findById(id).subscribe((res: any) => {
          this.authService.loggedInUser = res.data.user;
        });

        this.loginErrors.clear();
        if (this.activatedRoute.snapshot.queryParams['success'] === 'checkout')
          this.router.navigate(['home/cart/checkout']);
        else this.router.navigate(['/']);
      },
      errorResponse => {
        console.log(errorResponse);
      }
    );
  }
}
