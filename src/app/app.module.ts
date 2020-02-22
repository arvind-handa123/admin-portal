import { EkycDashboardComponent } from './views/e-kyc/ekyc-dashboard/ekyc-dashboard.component';
import { InterceptorService } from './services/ekyc/interceptor.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import {MatIconModule} from '@angular/material/icon';

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { NavbarComponent } from './containers/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION, NgxUiLoaderHttpModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';

// import { CamelCaseToSpacePipe } from './camel-case-to-space.pipe';
import {MatTabsModule} from '@angular/material/tabs';
import { AuthService } from './auth/auth.service';
import { ParticlesModule } from 'angular-particle';
import { FooterButtonComponent } from './views/controls/footer-button/footer-button.component';
import { CustomAppHeaderComponent } from './containers/custom-app-header/custom-app-header.component';
import { ChangePasswordComponent } from './views/change-password/change-password.component';
import { FilterGroupsPipe } from './filter-groups.pipe';
import { CustomPaginationComponent } from './views/controls/custom-pagination/custom-pagination.component';
import { PortalSelectComponent } from './containers/portal-select/portal-select.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#00acc1',
  bgsOpacity: 5,
  bgsPosition: POSITION.centerCenter,
  bgsSize: 60,
  bgsType: SPINNER.squareLoader,
  blur: 5,
  delay: 0,
  fgsSize: 100,
  fgsType: SPINNER.rectangleBounce,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,
  overlayBorderRadius: '0',
  overlayColor: 'rgba(40,40,40,0.98)',
};


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    FormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
    ParticlesModule,
    MatIconModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CustomAppHeaderComponent,
    ChangePasswordComponent,
    PortalSelectComponent,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  AuthService,
  [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }]
],
  bootstrap: [AppComponent]
})
export class AppModule { }
