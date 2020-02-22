import { GeneralService } from './../general.service';
import { generalConfig } from './../ServiceUtils';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminReportsService {

  constructor(private http: HttpClient, private generalService: GeneralService) { }

  getSidebarItems(): Observable<any> {
    const url = `${generalConfig.ADMIN_SERVER_URL}/products/pages?productId=1002&username=${sessionStorage.getItem('username')}`;
    return this.generalService.getRequest(url);
  }

  getReportPageItems(): Observable<any> {
    const url = `${generalConfig.ADMIN_SERVER_URL}/products/pages?productId=1002&username=${sessionStorage.getItem('username')}`;
    return this.generalService.getRequest(url);
  }

  getReportsData(fileName): Observable<any> {
    const url = `${generalConfig.ADMIN_SERVER_URL}/query?username=${sessionStorage.getItem('username')}&filename=${fileName}`;
    return this.generalService.getRequest(url);
  }

  loadIframeContent(url): Observable<any> {
    return this.generalService.getRequest(url);
  }
}
