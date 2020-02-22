import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAppHeaderComponent } from './custom-app-header.component';

describe('CustomAppHeaderComponent', () => {
  let component: CustomAppHeaderComponent;
  let fixture: ComponentFixture<CustomAppHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomAppHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
