import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { AppService } from '../app.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private appService: AppService, private router: Router, private activatedRoute: ActivatedRoute) {}

  canActivate() {
    if (localStorage.getItem('token')) return true;

    if (this.router.url === '/home/cart')
      this.router.navigate(['/auth/login'], { queryParams: { success: 'checkout' } });
    else this.appService.navigateToAppLogin();

    console.log('Unauthorized Access');

    return false;
  }
}
