import { element } from 'protractor';
import { tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
// tslint:disable
import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup, MatTab, MatTabHeader } from '@angular/material';
import { EkycReportsService } from '../../../services/ekyc/ekyc-reports.service';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { BehaviorSubject } from 'rxjs';
import { GeneralService } from '../../../services/general.service';

// such override allows to keep some initial values

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: "success" });
}

export interface Remark {
  fieldId: string;
  remark?: string;
  groupId: number;
  sectionId: number;
  pageId: number;
  fieldValue?: any;
  side?: string;
}

@Component({
  selector: "app-user-details-table",
  templateUrl: "./user-details-table.component.html",
  styleUrls: ["./user-details-table.component.css"],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class UserDetailsTableComponent
  implements OnInit, OnChanges, AfterViewInit {
  @Input() formData: any;
  @Input() retailerId: any;
  @Input() category: any;
  @ViewChild("tabs") tabs: MatTabGroup;
  @Input() isEditable: boolean;

  public remarksArray: Remark[];
  alertsDismiss: any = [];
  isReviewEnabled: boolean = false;
  msisdn: any;
  tableData: any;
  selectedTabIndex: number = 0;
  docImage = {};
  showSubmitButtonOnApprove = false;
  currentImage: any;


  constructor(public ekycService: EkycReportsService, public generalService: GeneralService, public router: Router, private route: ActivatedRoute) {
    this.remarksArray = [];
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes.formData && changes.formData.currentValue) {
      this.msisdn = changes.formData.currentValue[0].sections[0].groups[0].fields.filter(
        field => field.fieldId === "msisdn"
      )[0].savedData;
      this.getUpdatedRetailerData();
    }
    if (changes.category && changes.category.currentValue) {
      this.category = changes.category.currentValue;
      if (changes.category.currentValue === "Under Review" || changes.category.currentValue === 'Re-Submitted') {
        this.isReviewEnabled = true;
        this.isEditable = true;
      }
    }

    if (changes.isEditable && changes.isEditable.currentValue) {
      this.isEditable = changes.isEditable.currentValue;
      if (changes.isEditable.currentValue) {
        this.isReviewEnabled = false;
      }
    }
  }

  onTabChange(event: MatTabChangeEvent) {
    return false;
  }

  ngOnInit() {


  }

  ngAfterViewInit(): void {
    this.tabs._handleClick = this.interceptTabChange.bind(this);
    let element = document.getElementById("infoIcon");
    element.click();
  }

  interceptTabChange(tab: MatTab, tabHeader: MatTabHeader, idx: number) {
    if (this.remarksArray.length > 0) {
      const result = confirm(
        `You have not submitted your remarks.Do you really want to switch to - ${tab.textLabel}?`
      );
      return (
        result && MatTabGroup.prototype._handleClick.apply(this.tabs, arguments)
      );
    }
    MatTabGroup.prototype._handleClick.apply(this.tabs, arguments);
  }

  onRemarkorValueInput(
    sectionId,
    groupId,
    pageId,
    incomingFieldId,
    event,
    side?
  ) {
    let remarksObj: Remark;

    if (event.type === "click" || event.type === "change") {
      remarksObj = {
        sectionId,
        groupId,
        fieldId: incomingFieldId,
        pageId,
        fieldValue: event.target.value,
        side: side
      };
      this.addToRemarksArray(incomingFieldId, remarksObj, event);
    }

    if (event.type === "keyup") {
      event.keyCode === 13 && event.preventDefault() && event.stopPropagation();
      if (event.target.value.match(event.target.pattern) !== null) {
        remarksObj = {
          sectionId,
          groupId,
          fieldId: incomingFieldId,
          pageId,
          fieldValue:
            event.target.name === "fieldValue" ? event.target.value : undefined,
          remark:
            event.target.name === "remark" ? event.target.value : undefined,
          side: side
        };
        this.addToRemarksArray(incomingFieldId, remarksObj, event);
      } else {
        alert("Invalid Field value");
      }
    }

  }

  private addToRemarksArray(
    incomingFieldId: any,
    remarksObj: Remark,
    event: any
  ) {
    let fieldIndex =
      this.remarksArray &&
      this.remarksArray.findIndex(({ fieldId }) => fieldId === incomingFieldId);

    if (event.target.value !== '') {
      if (fieldIndex === -1) {
        this.remarksArray.push(remarksObj);
      } else if (this.remarksArray[fieldIndex].side && remarksObj.side && this.remarksArray[fieldIndex].side !== undefined && remarksObj.side !== undefined) {
        let sideIndex = this.remarksArray.findIndex(({ side, fieldId }) => side === remarksObj.side && fieldId === incomingFieldId);
        if (sideIndex !== -1) {
          this.remarksArray[sideIndex] = remarksObj;
        } else {
          this.remarksArray.push({ ...remarksObj });
        }
      } else {
        this.remarksArray[fieldIndex] = {
          ...this.remarksArray[fieldIndex],
          fieldValue:
            event.target.name === "fieldValue" ? event.target.value : this.remarksArray[fieldIndex]['fieldValue'],
          remark:
            event.target.name === "remark" ? event.target.value : this.remarksArray[fieldIndex]['remark'],
        };
      }
    }

    let currentElementIndex = Array.from(
      event.srcElement.form.elements
    ).indexOf(event.srcElement);


    if (event.type === "click" || event.type === "change") {
      if (event.srcElement.form.elements[currentElementIndex + 1]
        && event.srcElement.form.elements[currentElementIndex + 1].nodeName === 'INPUT') {
        event.srcElement.form.elements[currentElementIndex + 1].focus();
      }
    } else if (event.type == "keyup" && event.which === 13) {
      let i = 1;
      while (event.srcElement.form.elements[currentElementIndex + i].nodeName !== 'INPUT') {
        i += 1;
      }
      event.srcElement.form.elements[currentElementIndex + i].focus();
      }
    }


  postRemarks(event) {
    event.preventDefault();
    this.ekycService
      .postRemarksPerPage(this.remarksArray, this.retailerId)
      .subscribe(
        res => {
          this.add("Remark Posted");
          this.remarksArray = [];
          this.getUpdatedRetailerData();
        },
        err => {
          {
            alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
            sessionStorage.clear();
            this.router.navigate(['/login']);
          };
          this.router.navigate(['/login']);
        }
      );
  }

  private getUpdatedRetailerData() {
    this.ekycService.getRetailerInfoByMsisdn(this.msisdn).subscribe(res => this.formData = res.pagesDTOs, err => console.error(err));
  }

  add(msg): void {
    this.alertsDismiss.push({
      type: "danger",
      msg,
      timeout: 3000
    });
  }

  initiateReview() {
    this.ekycService.initiateReview(this.msisdn).subscribe(
      res => {
        this.add("Review Initiated");
        this.isReviewEnabled = this.isReviewEnabled === true ? false : true;
        this.isEditable = true;
      },
      err => {
        alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    );
  }

  approveKyc() {
    this.ekycService.approveKycApplication(this.msisdn).subscribe(
      res => {
        this.add("Application Approved");
        this.isReviewEnabled = this.isReviewEnabled === true ? false : true;
      },
      err => {
        alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    );
  }

  rejectKyc() {
    this.ekycService.rejectKycApplication(this.msisdn).subscribe(
      res => {
        this.add("Application Rejected");
        this.isReviewEnabled = this.isReviewEnabled === true ? false : true;
      },
      err => {
        alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    );
  }

  reSendKyc() {
    this.ekycService.resendKycApplication(this.msisdn).subscribe(
      res => {
        this.add("Application Re-sent");
        this.isReviewEnabled = this.isReviewEnabled === true ? false : true;
      },
      err => {
        alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    );
  }

  navigateToDocsPage() {
    this.router.navigate([
      `/kyc/disclaimer-docs/${this.retailerId}`,
      { msisdn: this.msisdn }
    ]);
  }

  getFile(filename, fieldId) {
    this.ekycService.downloadAttachments(this.retailerId, filename).subscribe(res => {
      this.docImage[fieldId] = res;
    },
      err => {
        alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
        sessionStorage.clear();
        this.router.navigate(['/login']);
      });
  }

  getFormattedDate(dateString) {
    return dateString.split("/").reverse().join("-")
  }

  getGroup(fromGroup, groupArray) {
    return groupArray.find(group => group.groupId === fromGroup);
  }

  blurEvent(sectionId,
    groupId,
    pageId,
    incomingFieldId,
    event,
    side?) {
    this.onRemarkorValueInput(sectionId, groupId, pageId, incomingFieldId, event, side);
  }

  functionThatPreventsDefault(event){
    event.which === 13 && event.preventDefault();
    return;
  }

  setCurrentImage(img){
    this.currentImage = img;
  }

}


