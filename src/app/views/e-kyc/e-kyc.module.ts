import { FilterGroupsPipe } from './../../filter-groups.pipe';
import { FooterButtonComponent } from './../controls/footer-button/footer-button.component';
import { MatIconModule } from '@angular/material/icon';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';


import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { EKycRoutingModule } from './e-kyc-routing.module';
import { EkycDashboardComponent } from './ekyc-dashboard/ekyc-dashboard.component';
import { KycTableComponent } from './kyc-table/kyc-table.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDetailsTableComponent } from './user-details-table/user-details-table.component';
import { CamelCaseToSpacePipe } from '../../camel-case-to-space.pipe';
import { AlertModule } from 'ngx-bootstrap/alert';
import {MatButtonModule} from '@angular/material/button';
import { DocumentsTableComponent } from './documents-table/documents-table.component';
import { CustomPaginationComponent } from '../controls/custom-pagination/custom-pagination.component';

@NgModule({
  declarations: [
    EkycDashboardComponent,
    KycTableComponent,
    UserDetailsComponent,
    UserDetailsTableComponent,
    CamelCaseToSpacePipe,
    DocumentsTableComponent,
    UploadDocumentsComponent,
    FooterButtonComponent,
    FilterGroupsPipe,
    CustomPaginationComponent,
  ],
  imports: [
    CommonModule,
    EKycRoutingModule,
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    MatTabsModule,
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    MatButtonModule,
    MatIconModule,
    FormsModule
  ]
})
export class EKycModule { }
