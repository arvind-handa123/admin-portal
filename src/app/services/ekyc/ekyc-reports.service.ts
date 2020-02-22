import { AuthService } from './../../auth/auth.service';
// tslint:disable
import { catchError, map } from 'rxjs/operators';
import { Observable, config, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { kycConfig } from "../ServiceUtils";
import { DomSanitizer } from '@angular/platform-browser';
import { GeneralService } from '../general.service';

@Injectable({
  providedIn: 'root'
})
export class EkycReportsService {

  public retailerData: any;
  sectionName: string;

  constructor(private http: HttpClient,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private generalService: GeneralService
    ) { }



  getUserKycDetailsForm(): Observable<any> {
    let url = `${kycConfig.KYC_SERVER_URL}/pages?productId=${sessionStorage.getItem('currentProductId')}&username=${sessionStorage.getItem('username')}`;
    return this.generalService.getRequest(url);
  }

  postRemarksPerPage(remarksData, userId): Observable<any> {
    let url = `${kycConfig.KYC_SERVER_URL}/remark?userId=${userId}&remarkBy=${sessionStorage.getItem('username')}&username=${sessionStorage.getItem('username')}`, body = remarksData;
      return this.generalService.postRequest(url, body);
  }

  initiateReview(msisdn) : Observable<any> {
    let url = `${kycConfig.KYC_ACTIONS_URL}/review/initiate?msisdn=${msisdn}&username=${sessionStorage.getItem('username')}`, body = null;
    return this.generalService.postRequest(url, body);
  }

  approveKycApplication(msisdn) : Observable<any> {
    let url = `${kycConfig.KYC_ACTIONS_URL}/approve?msisdn=${msisdn}&username=${sessionStorage.getItem('username')}`, body = null;
    return this.generalService.postRequest(url, body);
  }

  rejectKycApplication(msisdn) : Observable<any> {
    let url = `${kycConfig.KYC_ACTIONS_URL}/reject?msisdn=${msisdn}&username=${sessionStorage.getItem('username')}`, body = null;
    return this.generalService.postRequest(url, body);
  }

  resendKycApplication(msisdn) : Observable<any> {
    let url = `${kycConfig.KYC_ACTIONS_URL}/submit/re-send?msisdn=${msisdn}&username=${sessionStorage.getItem('username')}`, body = null;
    return this.generalService.postRequest(url, body);
  }

  generateLOC(msisdn) : Observable<any> {
    let url = `${kycConfig.KYC_ACTIONS_URL}/loc/generate?msisdn=${msisdn}&username=${sessionStorage.getItem('username')}`, body = null;
    return this.http.post(`${url}`, body, {responseType: 'blob'}).pipe(
      map(res => res),
      catchError(err=> throwError(err))
      )
  }

  issueLOC(msisdn) : Observable<any> {
    let url = `${kycConfig.KYC_ACTIONS_URL}/loc/issue?msisdn=${msisdn}&username=${sessionStorage.getItem('username')}`, body = null;
    return this.generalService.postRequest(url, body);
  }

  getDisclaimerDocuments(msisdn) {
    let url = `${kycConfig.KYC_ACTIONS_URL}/documents/disclaimer?msisdn=${msisdn}&username=${sessionStorage.getItem('username')}`;
    return this.generalService.getRequest(url);
  }


  downloadKycDisclaimerDocument(retailerId, fileName) : Observable<any> {
    let url = `${kycConfig.KYC_ATTACHMENTS_URL}/doc/disclaimer/file?username=${sessionStorage.getItem('username')}&retailerId=${retailerId}&filename=${fileName}`;
    return this.http.get(`${url}`,{responseType: 'blob'}).pipe(
      map(res => res),
      catchError(err=> throwError(err))
      )
  }

  downloadAttachments(retailerId, fileName): Observable<any> {
    let url = `${kycConfig.KYC_ATTACHMENTS_URL}/retailer/image/file?username=${sessionStorage.getItem('username')}&retailerId=${retailerId}&filename=${fileName}`;
    return this.http.get(`${url}`,{responseType: 'blob'}).pipe(
      map(res => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res))),
      catchError(err=> throwError(err))
      )
  }

  uploadKycDocument(retailerId, file, documentType): Observable<any> {
    let formData = new FormData()
    formData.append('files', file);
    let url = `${kycConfig.KYC_ATTACHMENTS_URL}/upload/image?username=${sessionStorage.getItem('username')}&retailerId=${retailerId}&documentType=${documentType}`;
    return this.generalService.postRequest(url, formData);
  }

  getSectionData(sectionName:string, pageNo, pageSize): Observable<any>{
    let url = `${kycConfig.KYC_ACTIONS_URL}/profiles/${sectionName}?username=${sessionStorage.getItem('username')}&page_no=${pageNo}&page_size=${pageSize}`;
    return this.generalService.getRequest(url);
  }

  bulkUploadDocuments(retailerId, documentData){
    let formData = new FormData();
    for (let x in documentData) {
      formData.append(x, documentData[x])
    }
    let url = `${kycConfig.KYC_ATTACHMENTS_URL}/upload/docs?retailerId=${retailerId}&username=${sessionStorage.getItem('username')}`
    return this.generalService.postRequest(url, formData);

  }

  getRetailerInfoByMsisdn(msisdn){
    let url = `${kycConfig.KYC_ACTIONS_URL}/retailer/profile?msisdn=${msisdn}&username=${sessionStorage.getItem('username')}`
    return this.generalService.getRequest(url);
  }


}
