// tslint:disable
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { generalConfig } from './ServiceUtils'
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public allProducts: any;
  public productImages = {};
  public changeDashboard: EventEmitter<any> = new EventEmitter();
  public localeUpdate: EventEmitter<any> = new EventEmitter();
  bSubject = new BehaviorSubject("a");

  constructor(public http: HttpClient, private domSanitizer: DomSanitizer) { }



  getRequest(url: string): Observable<any> {
    return this.http.get(`${url}`).pipe(
      map(res => res),
      catchError(err => throwError(err.status)));
  }

  postRequest(url: string, body: any): Observable<any> {
    return this.http.post(`${url}`, body).pipe(
      map(res => res),
      catchError(err => throwError(err.status))
    );
  }

  getAllProducts() {
    let url = `${generalConfig.ADMIN_SERVER_URL}/products?username=${sessionStorage.getItem('username')}`;
    return this.getRequest(url).pipe(
      map(res => res),
      catchError(err => throwError(err))
    );
  }

  getProductImages(filename) {
    let url = `${generalConfig.ADMIN_SERVER_URL}/products/logo/file?username=${sessionStorage.getItem('username')}&filename=${filename}`;
    return this.http.get(`${url}`, { responseType: 'blob' }).pipe(
      map(res => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res))),
      catchError(err => throwError(err))
    );
  }

  select(e) {
    this.changeDashboard.emit(e);
  }

  updateLocale(val){
    this.bSubject.next('b');
  }

  getHtmlPage(): Observable<any> {
    return this.http.get('https://connect-dr.yabx.co/text_message_campaigns', { responseType: 'text' }).pipe(
      map(res => res),
      catchError(err => throwError(err)));
  }


}
