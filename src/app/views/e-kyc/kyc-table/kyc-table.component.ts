import { kycConfig } from './../../../services/ServiceUtils';
// tslint:disable
import { EkycReportsService } from './../../../services/ekyc/ekyc-reports.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-kyc-table',
  templateUrl: './kyc-table.component.html',
  styleUrls: ['./kyc-table.component.css']
})
export class KycTableComponent implements OnInit, OnChanges {


  @Input() tableData: any;
  @Input() section: string;
  @Input() columnHeaders: any[];
  @Input() r_id: any;
  @Input() isUpload: boolean = false;
  @Input() msisdn: any;
  @Output() pageChanged = new EventEmitter<any>()
  @Input() profileCount = 0;
  @Input() allDocsRecieved: any
  @Output() documentUploadSuccessful: EventEmitter<any> = new EventEmitter<any>()

  retailers = [];
  retailerId: any;
  showDocumentsTable = false;
  file: any;
  fileNotValid = false;
  fileData = {};
  locGenerated = false;
  currentPage = 1;
  isFileDataEmpty = true;

  constructor(private ekycService: EkycReportsService, private generalService: GeneralService, private router: Router) {
    this.retailers = []
  }


  ngOnInit() {
    this.isFileDataEmpty = Object.entries(this.fileData).length === 0 && this.fileData.constructor === Object;
    this.generalService.bSubject.subscribe(value => {
      if (sessionStorage.getItem('retailerData')) {
        let currentRetailer = JSON.parse(sessionStorage.getItem('retailerData'));
        if (currentRetailer) {
          let count = 0
          this.retailers.every(retailer => {
            if (currentRetailer[0].retailerId === retailer[0].retailerId) {
              this.setRetailerData(retailer);
              return false;
            }
          })
        }
      }
    });


  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tableData && changes.tableData.currentValue && Array.isArray(changes.tableData.currentValue.pagesDTOs)) {
      this.showDocumentsTable = false;
      this.retailerId = changes.tableData.currentValue.pagesDTOs[0] ? changes.tableData.currentValue.pagesDTOs[0].retailerId : undefined;
      this.retailers = this.groupBy(changes.tableData.currentValue.pagesDTOs);
      this.showDocumentsTable = false;
    } else {
      this.showDocumentsTable = true
    }
  }

  pageChange(event) {
    this.currentPage = parseInt(event);
    this.pageChanged.emit(parseInt(event))
  }

  groupBy(array) {
    let groupedObject = []
    array.map(page => {
      let group = Object.assign([], page.pagesDTOs)
      groupedObject.push(group)
    })
    return groupedObject
  }

  setRetailerData(retailerData) {
    let jsondata = JSON.stringify(retailerData);
    sessionStorage.setItem('retailerData', jsondata);
    sessionStorage.setItem('sectionName', this.section);
    this.ekycService.retailerData = retailerData;
    this.ekycService.sectionName = this.section;
  }

  isArray(tableData) {
    return Array.isArray(tableData);
  }

  downloadKycDocument(fileName: string) {
    this.ekycService.downloadKycDisclaimerDocument(this.r_id, fileName).subscribe(
      res => {
        this.downLoadFile(res, "application/pdf")
      },
      err => {
        alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    )
  }

  downLoadFile(data: any, type: string) {
    var blob = new Blob([data], { type });
    const blobUrl = URL.createObjectURL(blob);
    if (window.navigator.msSaveOrOpenBlob) {
      console.log('IE 11', data);
      window.navigator.msSaveOrOpenBlob(blob, "newFile.pdf");
    } else {
      const iframe = document.createElement('iframe');
      console.log(blobUrl);
      iframe.style.display = 'block';
      iframe.setAttribute('height', '100%');
      iframe.setAttribute('width', '100%');
      iframe.src = blobUrl
      let modalBody = document.getElementById('exampleModalBody')
      modalBody.innerHTML = '';
      modalBody.appendChild(iframe);
      document.getElementById('modal-launcher').click()
    }
  }

  updateFile(event) {
    let extension = event.target.files[0].name.split(".")[1].toLowerCase();
    if (extension !== "png" &&
      extension !== "jpg" &&
      extension !== "jpeg" &&
      extension !== "bmp" &&
      extension !== "pdf"
    ) {
      this.fileNotValid = true;
      setTimeout(() => {
        this.fileNotValid = false
      }, 3000);
      this.fileData[event.target.id.split(" ").join("_")] = undefined;
      alert("File type not valid. Please upload only valid types: .png, .jpg, .jpeg, .bmp, .pdf")
      return
    }
    this.fileData[event.target.id] = event.target.files[0];
    this.isFileDataEmpty = false;
  }

  uploadFile(docName, docType) {
    if (this.fileData[docType]) {
      this.ekycService.uploadKycDocument(this.r_id, this.fileData[docType], docType).subscribe(
        res => {
          alert("File uploaded Successfully")
          this.documentUploadSuccessful.emit("success")
          this.fileData[docType] = undefined

        },
        err => {
          alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
          sessionStorage.clear();
          this.router.navigate(['/login']);
        },
      );
    } else {
      alert("No file Chosen.")
    }
  }

  bulkUploadFile() {
    for (let x in this.fileData) {
      this.ekycService.uploadKycDocument(this.r_id, this.fileData[x], x).subscribe(
        res => {
          if(Object.keys(this.fileData)[Object.keys(this.fileData).length-1] === x){
            alert("All Files uploaded Successfully")
            this.isFileDataEmpty = true;
          }
          this.documentUploadSuccessful.emit("success")
          this.fileData[x] = undefined
        },
        err => {
          alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
          sessionStorage.clear();
          this.router.navigate(['/login']);
        },
      );
    }
  }

  generateLOC() {
    this.ekycService.generateLOC(this.msisdn).subscribe(
      res => {
        this.locGenerated = true;
        alert("LOC generated.")
        this.downLoadFile(res, "application/pdf")
      },
      err => {
        alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    )
  }

  issueLOC() {
    this.ekycService.issueLOC(this.msisdn).subscribe(
      res => alert("Loc Issued."),
      err => {
        alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    )
  }
}
