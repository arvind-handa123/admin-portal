import { IFrameComponent } from './iframe/iframe.component';
import { ReportsbaseComponent } from './reportsbase/reportsbase.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { EmbedComponent } from './embed/embed.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: '',
        component: ReportsbaseComponent,
        data: {
          title: ''
        },
      },
      {
        path: 'summary/:file',
        component: SummaryComponent,
        data: {
          title: 'Summary'
        }
      },
      {
        path: 'superset/:src',
        component: IFrameComponent,
        data: {
          title: 'SuperSet'
        }
      },
      {
        path: 'embed',
        component: EmbedComponent,
        data: {
          title: 'Embed'
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
