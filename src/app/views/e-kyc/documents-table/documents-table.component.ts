import { ActivatedRoute, Router } from '@angular/router';
import { EkycReportsService } from './../../../services/ekyc/ekyc-reports.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents-table',
  templateUrl: './documents-table.component.html',
  styleUrls: ['./documents-table.component.css']
})
export class DocumentsTableComponent implements OnInit {
  tableData: any;
  retailerId: any;
  msisdn: any;
  allDocsRecieved: any;

  constructor(private ekycService: EkycReportsService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.retailerId = data.id;
      this.msisdn = data.msisdn;
      this.route.snapshot.data.title = this.route.snapshot.data.title + ' /   ' + parseInt(data.id);
      this.ekycService.getDisclaimerDocuments(data.msisdn).subscribe(res => {
        this.tableData = res.disclaimerDocuments;
        this.allDocsRecieved = res.disclaimerDocRecieved;
      },
        err => {
          alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
          sessionStorage.clear();
          this.router.navigate(['/login']);
        });
    });
  }

}
