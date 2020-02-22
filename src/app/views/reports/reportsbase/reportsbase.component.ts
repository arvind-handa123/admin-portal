import { Component, OnInit } from '@angular/core';
import { aggregateReportItems, transactionReportItems } from '../../../_reports';
import { ThemeService } from '../../../services/theme.service';
import { AgentReportsService } from '../../../services/agent-portal/agent-reports.service';
import { AdminReportsService } from '../../../services/admin-portal/admin-reports.service';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-reportsbase',
  templateUrl: './reportsbase.component.html',
  styleUrls: ['./reportsbase.component.css']
})
export class ReportsbaseComponent implements OnInit {

  aggregateReportItems: any[];
  transactionReportItems: any[];
  resHtml: any;

  constructor(
    public themeService: ThemeService,
    public agentService: AgentReportsService,
    public adminService: AdminReportsService,
    public generalService: GeneralService
  ) { }

  ngOnInit() {
    this.adminService.getReportPageItems().subscribe(res => {
      this.setFieldName(res);
    });
    this.themeService.themeChange.subscribe(theme => {
      this.updateItemsByClient(theme.name);
    });


  }

  private setFieldName(res: any) {
    this.aggregateReportItems = res.menu[0].sections[0].groups;
    this.transactionReportItems = res.menu[0].sections[1].groups;
  }

  updateItemsByClient(client: string) {
    if (client === 'light') {
      this.agentService.getReportPageItems().subscribe(res => {
        this.setFieldName(res);
      });
    } else if (client === 'dark') {
      this.adminService.getReportPageItems().subscribe(res => {
        this.setFieldName(res);
      });
    }
  }

}
