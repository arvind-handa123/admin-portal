import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit, Output, EventEmitter, DoCheck } from '@angular/core';
import { EkycReportsService } from '../../../services/ekyc/ekyc-reports.service';
import { Router } from '@angular/router';
import { GeneralService } from '../../../services/general.service';
// tslint:disable
@Component({
  selector: 'app-ekyc-dashboard',
  templateUrl: './ekyc-dashboard.component.html',
  styleUrls: ['./ekyc-dashboard.component.css']
})
export class EkycDashboardComponent implements OnInit {

  userData: any;
  submittedReports: any;
  approvedReports: any;
  rejectedReports: any;
  collapse = [];
  currentPage = 1;
  sectionData: any;


  allSections: any[];
  profileCount: any;

  constructor(
    private kycService: EkycReportsService,
    private generalService: GeneralService,
    private authService: AuthService,
    private router: Router) {
    this.allSections = []
  }

  ngOnInit() {
    this.getFormData();
    this.generalService.bSubject.subscribe(val => {
      this.getFormData();

    })
  }

  getFormData() {
    this.allSections = []
    this.kycService.getUserKycDetailsForm().subscribe(res => {
      this.userData = res.retailerInfo[0].sections[0].pagesDTOs;
      this.allSections = res.retailerInfo[0].sections
      this.getPageData(0, 0)
      res.retailerInfo[0].sections.forEach((sect: any) => {
        if (this.allSections.indexOf(sect) !== 0) {
          this.collapse.push(false);
        } else {
          this.collapse.push(true);
        }
      },
        err => {
          alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
          sessionStorage.clear();
          this.router.navigate(['/login']);
        }
      );
    })
  }

  toggleCollapse(index: number) {
    this.sectionData = {}
    this.kycService.getSectionData(this.allSections[index].sectionName.toLowerCase().split(" ").join("-"), 0, 5).subscribe(
      data => {
        this.sectionData = Object.assign({}, this.allSections[index]);
        this.sectionData.pagesDTOs = data.profileDTOList
        if (data.profileCount) this.profileCount = data.profileCount;
      },
      err => {
        alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
        sessionStorage.clear();
        this.router.navigate(['/login']);
      })

    this.collapse = this.collapse.map((elem, indx) => indx !== index ? elem = false : elem = !elem);
  }

  pageChanged(event, ind) {
    this.getPageData(ind, event);
  }


  private getPageData(index: any, event: any) {
    this.sectionData = {};
    this.kycService.getSectionData(this.allSections[index].sectionName.toLowerCase().split(" ").join("-"), event, 5).subscribe(data => {
      this.sectionData = Object.assign({}, this.allSections[index]);
      this.sectionData.pagesDTOs = data.profileDTOList
      if (data.profileCount) this.profileCount = data.profileCount;
    }, err => {
      alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }
}
