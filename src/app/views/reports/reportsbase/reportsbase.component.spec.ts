import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsbaseComponent } from './reportsbase.component';

describe('ReportsbaseComponent', () => {
  let component: ReportsbaseComponent;
  let fixture: ComponentFixture<ReportsbaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsbaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
