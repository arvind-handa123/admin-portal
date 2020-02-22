import { EkycReportsService } from './../../../services/ekyc/ekyc-reports.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../services/general.service';

// tslint:disable
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public formData: any;
  public retailerId = 3;
  public section = '';
  public isEditable: boolean = false;

  constructor(private kycService: EkycReportsService, private generalService: GeneralService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.retailerId = params.id && parseInt(params.id);
      this.isEditable = params.edit && params.edit === 'true';
      this.route.snapshot.data.title = this.route.snapshot.data.title + ' /   ' + parseInt(params.id);
      this.getFormData();
    });

    this.generalService.bSubject.subscribe(value => {
      this.getFormData()
    });
  }

  getFormData() {
    if (this.kycService.retailerData && this.kycService.sectionName) {

      this.formData = this.kycService.retailerData;
      this.section = this.kycService.sectionName;
    } else {
      this.formData = JSON.parse(sessionStorage.getItem('retailerData'));
      this.section = sessionStorage.getItem('sectionName');
    }


  }

}
