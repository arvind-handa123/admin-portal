import { UserDetailsComponent } from './user-details/user-details.component';
import { EkycDashboardComponent } from './ekyc-dashboard/ekyc-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsTableComponent } from './documents-table/documents-table.component';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'KYC'
    },
    children: [
      {
        path: '',
        redirectTo: 'KYC'
      },
      {
        path: '',
        component: EkycDashboardComponent,
        data: {
          title: 'KYC'
        }
      },
      {
        path: 'submitted/:id',
        component: UserDetailsComponent,
        data: {
          title: 'SUBMITTED'
        }
      },
      {
        path: 'under-review/:id',
        component: UserDetailsComponent,
        data: {
          title: 'UNDER REVIEW'
        }
      },
      {
        path: 'approved/:id',
        component: UserDetailsComponent,
        data: {
          title: `APPROVED`
        }
      },
      {
        path: 'rejected/:id',
        component: UserDetailsComponent,
        data: {
          title: 'REJECTED'
        }
      },
      {
        path: 'loc-generated/:id',
        component: UserDetailsComponent,
        data: {
          title: 'LOC GENERATED'
        }
      },
      {
        path: 'loc-issued/:id',
        component: UserDetailsComponent,
        data: {
          title: 'LOC ISSUED'
        }
      },
      {
        path: 're-submitted/:id',
        component: UserDetailsComponent,
        data: {
          title: 'RE-SUBMITTED'
        }
      },
      {
        path: 'disclaimer-docs/:id',
        component: DocumentsTableComponent,
        data: {
          title: 'APPROVED  /  DOCUMENTS'
        }
      },
      {
        path: 'upload-docs/:id',
        component: UploadDocumentsComponent,
        data: {
          title: 'APPROVED  /  UPLOAD DOCUMENTS'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EKycRoutingModule { }
