import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'll-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  storeLoginObject: any;

  constructor(private appService: AppService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.storeLoginObject = this.appService.getStoreLoginObject();
    if (localStorage.getItem('id_token') == null) this.login();
    else this.router.navigate(['home']);
  }

  login() {
    this.authService.tradeupLogin(this.storeLoginObject).subscribe(
      (res: any) => {
        localStorage.setItem('id_token', res.token);
        this.router.navigate(['home']);
      },
      errorResponse => {
        console.log(errorResponse);
      }
    );
  }
}
