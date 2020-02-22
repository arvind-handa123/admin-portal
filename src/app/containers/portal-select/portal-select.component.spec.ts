import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalSelectComponent } from './portal-select.component';

describe('PortalSelectComponent', () => {
  let component: PortalSelectComponent;
  let fixture: ComponentFixture<PortalSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
