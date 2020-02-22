import { DomSanitizer } from '@angular/platform-browser';
import { GeneralService } from './../../services/general.service';
import { AuthService } from './../../auth/auth.service';
import { AgentReportsService } from './../../services/agent-portal/agent-reports.service';
import { AdminReportsService } from './../../services/admin-portal/admin-reports.service';
import { ThemeService } from './../../services/theme.service';
import { Component, OnInit, SecurityContext, OnChanges, AfterViewInit } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';

export interface BrandInterface {
  src: any;
  width: number;
  height: number;
  alt: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

  public sidebarMinimized = false;
  public navItems = navItems;
  public currentTheme: string;
  public allProducts: any;
  public showPortalSwitch = true;
  adminLoginData = {
    username: 'admin',
    password: 'password'
  };

  agentLoginData = {
    username: 'agent',
    password: 'password'
  };

  selectedBrand: any;

  navBrands: BrandInterface[] = [
    {
      src: 'assets/img/brand/yabx.png',
      width: 120,
      height: 25,
      alt: 'Yabx'
    },
    {
      src: 'assets/img/brand/airtel.png',
      width: 150,
      height: 50,
      alt: 'Airtel'
    },
    {
      src: 'assets/img/brand/ekyc-logo.jpg',
      width: 120,
      height: 25,
      alt: 'Kyc'
    },
  ];
  productImages: any;

  constructor(public themeService: ThemeService,
    public adminReportService: AdminReportsService,
    public agentReportService: AgentReportsService,
    public router: Router,
    private authService: AuthService,
    public generalService: GeneralService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getInitialProducts();
    this.showPortalSwitch = sessionStorage.getItem('productCount') ? false : true;
    this.initialSetup();
  }



  private getInitialProducts() {
    this.generalService.getAllProducts().subscribe(res => {
      // this.allProducts = res;
      res.forEach(element => {
        this.generalService.getProductImages(element.icon).subscribe(response => {
          this.navBrands.forEach(brand => {
            if (brand.alt.toLowerCase() === element.title.toLowerCase()) {
              brand['src'] = response;
            }
          });
        }, err => {
          alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
          sessionStorage.clear();
          this.router.navigate(['/login']);
        });
      });
    }, err => {
      alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  private initialSetup() {
    this.currentTheme = sessionStorage.getItem('currentLogin');
    switch (sessionStorage.getItem('currentLogin')) {
      case 'yabx':
        this.themeService.setyabxTheme();
        this.selectedBrand = this.navBrands[0];
        this.getYabxSidebarItems();
        this.currentTheme = 'yabx';
        break;
      case 'airtel':
        this.themeService.setairtelTheme();
        this.selectedBrand = this.navBrands[1];
        this.getAirtelSidebarItems();
        this.currentTheme = 'airtel';
        break;
      case 'kyc':
        this.themeService.setEKycTheme();
        this.selectedBrand = this.navBrands[2];
        this.getEKycSidebarItems();
        this.currentTheme = 'kyc';
        break;
    }

  }

  private getYabxSidebarItems() {
    this.adminReportService.getSidebarItems().subscribe(
      res => {
        this.navItems = [];
        res.menu.forEach(item => {
          this.navItems.push({
            name: item.pageName,
            url: item.pageName === 'Product Config' ? 'http://13.232.120.252/#/login' : `/${item.pageName.toLowerCase().split(' ').join('-')}`,
            icon: 'icon-speedometer',
          });
        });
        this.navItems.push({
          name: 'Embed',
          url: '/reports/embed',
          icon: 'icon-speedometer',
        });
        this.router.navigate([this.navItems[0].url]);
      },
      err => {
        alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    );

  }

  private getAirtelSidebarItems() {
    this.agentReportService.getSidebarItems().subscribe(res => {
      this.navItems = [];
      res.menu_items.forEach(item => {
        this.navItems.push({
          name: item.title,
          url: item.title === 'User Management' ? `/base/${item.title.toLowerCase().split(' ').join('-')}` : `/${item.title.toLowerCase().split(' ').join('-')}`,
          icon: 'icon-speedometer',
        });
      });
      this.router.navigate([this.navItems[0].url]);
    },
      err => {
        alert(err === 401 ? 'Your session has expired.Please Sign in again.' : err);
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    );
  }

  private getEKycSidebarItems() {
    this.navItems = [];
    this.navItems.push({
      name: 'Dashboard',
      url: `/kyc`,
      icon: 'icon-speedometer',
    });
    // this.router.navigate([this.navItems[0].url]);
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  switchPortal() {
    this.router.navigate(['/select-portal']);
  }
}
