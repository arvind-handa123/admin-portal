import { TestBed } from '@angular/core/testing';

import { EkycReportsService } from './ekyc-reports.service';

describe('EkycReportsService', () => {
  let service: EkycReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EkycReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
