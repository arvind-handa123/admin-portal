import { generalConfig } from './../services/ServiceUtils';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap, catchError, map } from 'rxjs/operators';

export interface LoginResponseObject {
  message: string;
  statusCode: string;
  authInfo: {
    YABX_KYC_ACCESS_TOKEN: string
  };
  username: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  allProducts: any;

  constructor(private http: HttpClient, public router: Router) { }

  doLogin(data): Observable<any> {
    return this.http.post(`${generalConfig.ADMIN_SERVER_URL}/admin/kyc/login`, data).pipe(
      tap((val: LoginResponseObject) => {
        if (val.message === 'SUCCESS') {
          this.isLoggedIn = true;
          sessionStorage.setItem('token', val.authInfo['YABX_KYC_ACCESS_TOKEN']);
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('username', val.username);
        }
      }),
      catchError(err => throwError(err.message))
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  checkIfLoggedIn() {
    return sessionStorage.getItem('isLoggedIn') && sessionStorage.getItem('isLoggedIn') === 'true' ? true : false;
  }

  changePassword(data): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.post(`${generalConfig.ADMIN_SERVER_URL}/admin/kyc/password/change?username=${sessionStorage.getItem('username')}`, data)
      .pipe(
        map(res => res),
        catchError(err => throwError(err.message))
      );
  }
}
