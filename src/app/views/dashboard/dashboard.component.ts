import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  optionValue = 'super-admin';
  constructor(private generalService: GeneralService) {}
  ngOnInit() {
    this.generalService.changeDashboard.subscribe(data => {
      this.optionValue = data;
    });
  }
}
