import { TableComponent } from './table/table.component';
import { SummaryComponent } from './summary/summary.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsbaseComponent } from './reportsbase/reportsbase.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AgentReportsService } from '../../services/agent-portal/agent-reports.service';
import { AdminReportsService } from '../../services/admin-portal/admin-reports.service';
import { IFrameComponent } from './iframe/iframe.component';
import { EmbedComponent } from './embed/embed.component';


@NgModule({
  declarations: [
    ReportsbaseComponent,
    SummaryComponent,
    TableComponent,
    IFrameComponent,
    EmbedComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    AgentReportsService,
    AdminReportsService
  ]
})
export class ReportsModule { }
