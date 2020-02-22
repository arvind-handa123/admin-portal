import { AdminReportsService } from './../../../services/admin-portal/admin-reports.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// tslint:disable
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  dataFile: any;
  tableData: any;
  columnHeaders: any[];
  tableName: any;

  constructor(private route: ActivatedRoute, private adminReportsService: AdminReportsService, private router: Router) {
    this.columnHeaders = []
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.file) {
        this.columnHeaders = []
        this.dataFile = parseInt(params.file);
        this.tableName = params.tableName
        this.adminReportsService.getReportsData(params.file).subscribe(
          res => {
            this.tableData = res;
            res[0].forEach(data => {
              this.columnHeaders.push(data.fieldName)
            });
          },
          err => {
            alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
            sessionStorage.clear();
            this.router.navigate(['/login']);
          },
        )
      }
    });
  }

}
