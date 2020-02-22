import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
// tslint:disable
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  oldPassword = '';
  newPassword = '';

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  changePassword() {
    let passwordData = {
      currentPassword: this.oldPassword,
      newPassword: this.newPassword
    }
    this.authService.changePassword(passwordData).subscribe(
      res => {
        this.oldPassword = this.newPassword = '';
        alert('Password Updated');
        this.authService.logout()
      },
      err => {
        alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    )
  }
}
