import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: string;
  otherLang = 'Bangla';

  constructor(private authService: AuthService, private generalService: GeneralService) { }

  ngOnInit() {
    this.user = sessionStorage.getItem('username');
    this.otherLang = sessionStorage.getItem('locale') === 'bn_BD' ? 'English' : 'Bangla';
  }
  logout() {
    this.authService.logout();
  }

  switchToBangla() {
    if (sessionStorage.getItem('locale') !== 'bn_BD') {
      console.log('if');
      this.otherLang = 'English';
      sessionStorage.setItem('locale', 'bn_BD');
      this.generalService.updateLocale('bn_BD');
    } else {
      console.log('else');
      this.otherLang = 'Bangla';
      sessionStorage.removeItem('locale');
      this.generalService.updateLocale('bn_BD');

    }
  }

}
