import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, delay, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgentReportsService {

  constructor(private http: HttpClient) { }

  getSidebarItems(): Observable<any> {
    return this.http.get('../../../assets/json/agent-portal-menus.json').pipe(
      map(res => res),
      catchError(e => throwError(e))
    );
  }

  getReportPageItems(): Observable<any> {
    return this.http.get('../../../assets/json/agent-portal-reports.json').pipe(
      map(res => res),
      catchError(e => throwError(e))
    );
  }


}
