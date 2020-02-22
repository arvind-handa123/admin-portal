// tslint:disable
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {


  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;
  loginData = {
    username: '',
    password: ''
  };


  constructor(
    public authService: AuthService,
    public router: Router,
    public generalService: GeneralService,
  ) { }

  ngOnInit() {
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      'background': 'linear-gradient(#050c4c, #655e5e)'
    };
    this.myParams = {
      particles: {
        number: {
          value: 100,
        },
        color: {
          value: '#ffffff'
        },
        shape: {
          type: 'circle',
        },
      }
    };
  }

  getAllProducts() {
    this.generalService.getAllProducts().subscribe(
      res => {
        this.generalService.allProducts = res;
        res.forEach(item => {
          this.getProductImage(item);
        });
      },
      err => {
        alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
        sessionStorage.clear();
        this.router.navigate(['/login']);
      },
    )
  }

  getProductImage(item) {
    this.generalService.getProductImages(item.icon).subscribe(
      res => this.generalService.productImages[item.title] = res,
      err => {
        alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    )
  }


  doLogin() {
    this.authService.doLogin(this.loginData).subscribe((res) => {
      let size = Object.keys(res.productAccess).length;
      if (this.authService.isLoggedIn) {
        this.getAllProducts();
        setTimeout(() => {
          // let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/e-kyc';
          let redirect;
          if (size === 1) {
            // redirect = '/' + Object.values(res.productAccess)[0].toString().toLowerCase();
            sessionStorage.setItem('productCount', "one");
            let theme = Object.values(res.productAccess)[0].toString().toLowerCase()
            let key = Object.keys(res.productAccess)[0]
            sessionStorage.setItem('currentLogin', Object.values(res.productAccess)[0].toString().toLowerCase());
            sessionStorage.setItem('currentProductId', key);
            redirect = '/' + theme;
          } else {
            redirect = '/select-portal';
            sessionStorage.removeItem('productCount');
            sessionStorage.setItem('productAccess', JSON.stringify(res.productAccess));
          }
          this.router.navigateByUrl(redirect);
        }, 1000);
      } else {
        alert('Failed to login');
      }
    }, err => {
      alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  // adminLogin() {
  //   this.authService.adminLogin(this.loginData).subscribe((res) => {
  //     if (this.authService.isLoggedIn) {
  //       this.getAllProducts();
  //       setTimeout(() => {
  //         let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) :
  //           this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/select-portal';
  //           sessionStorage.setItem('productAccess', res.productAccess);
  //         this.router.navigateByUrl(redirect);
  //       }, 1000);
  //     } else {
  //       alert('Failed to login');
  //     }
  //   }, err => {
  //     alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
  //     sessionStorage.clear();
  //     this.router.navigate(['/login']);
  //   });
  // }

  // agentLogin() {
  //   this.authService.agentLogin(this.loginData).subscribe((res) => {
  //     if (this.authService.isLoggedIn) {
  //       this.getAllProducts();
  //       setTimeout(() => {
  //         let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) :
  //           this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/select-portal';
  //           sessionStorage.setItem('productAccess', res.productAccess);
  //         this.router.navigateByUrl(redirect);
  //       }, 1000);
  //     } else {
  //       alert('Failed to login');
  //     }
  //   }, err => {
  //     alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
  //     sessionStorage.clear();
  //     this.router.navigate(['/login']);
  //   });
  // }

  logout() {
    this.authService.logout();
  }

}
