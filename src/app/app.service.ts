import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {
  private _apiUrl: string = environment.apiUrl;
  private _storeLoginObject: any = environment.storeLoginObject;
  public loading: boolean = false;
  loggedInUser = false;

  constructor(private _router: Router) {}

  getApiUrl() {
    return this._apiUrl;
  }

  getStoreLoginObject() {
    return this._storeLoginObject;
  }

  navigateToAppLogin() {
    this._router.navigate(['auth/login']);
  }
}
