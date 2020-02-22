import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EkycDashboardComponent } from './ekyc-dashboard.component';

describe('EkycDashboardComponent', () => {
  let component: EkycDashboardComponent;
  let fixture: ComponentFixture<EkycDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EkycDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EkycDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
