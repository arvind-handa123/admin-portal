import { Component, OnInit } from '@angular/core';
import { EkycReportsService } from '../../../services/ekyc/ekyc-reports.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css']
})
export class UploadDocumentsComponent implements OnInit {
  tableData: any;
  retailerId: any;
  msisdn: any;
  allDocsRecieved: any;

  constructor(private ekycService: EkycReportsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      data => {
        this.retailerId = data.id;
        this.msisdn = data.msisdn;
        // tslint:disable-next-line: radix
        this.route.snapshot.data.title = this.route.snapshot.data.title + ' /   ' + parseInt(data.id);

        this.getDisclaimerDocs();
      }
    );
  }

   getDisclaimerDocs() {
    this.ekycService.getDisclaimerDocuments(this.msisdn).subscribe(res => {
      this.tableData = res.disclaimerDocuments;
      this.allDocsRecieved = res.disclaimerDocRecieved;
    }, err => console.error(err));
  }


}
