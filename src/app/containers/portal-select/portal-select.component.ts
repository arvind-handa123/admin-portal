import { ThemeService } from './../../services/theme.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portal-select',
  templateUrl: './portal-select.component.html',
  styleUrls: ['./portal-select.component.css']
})
export class PortalSelectComponent implements OnInit {

  accessObj: any;
  currentTheme: string;

  constructor(private router: Router, private themeService: ThemeService) { }

  ngOnInit() {
    this.accessObj = JSON.parse(sessionStorage.getItem('productAccess'));
  }


  toggleTheme(theme, key) {
    sessionStorage.setItem('currentLogin', theme);
    sessionStorage.setItem('currentProductId', key);
    // setTimeout(() => {
      switch (theme) {
        case 'airtel':
          // this.themeService.setairtelTheme();
          // this.currentTheme = 'airtel';
          this.router.navigate([`/${theme}`]);
          break;
        case 'yabx':
          // this.themeService.setyabxTheme();
          // this.currentTheme = 'yabx';
          this.router.navigate([`/${theme}`]);
          break;
        case 'kyc':
          // this.themeService.setEKycTheme();
          // this.currentTheme = 'kyc';
          this.router.navigate([`/${theme}`]);
          break;
      }
    // }, 1000);
  }



  onPortalSelection(event){
    let key, value;
    key = event.target.value;
    value = this.accessObj[key];
    this.toggleTheme(value.toLowerCase(), key);
  }

}
