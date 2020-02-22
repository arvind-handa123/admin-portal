import { delay } from 'rxjs/operators';
// tslint:disable
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {


  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
      delay(1000)
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      return next.handle(
        req.clone({
          headers: req.headers.append('YABX_KYC_ACCESS_TOKEN', sessionStorage.getItem('token')),
          url: sessionStorage.getItem('locale') === 'bn_BD' ?  req.url + '&locale=bn_BD' : req.url
        })
      );
    }
    return next.handle(req);
  }
}
