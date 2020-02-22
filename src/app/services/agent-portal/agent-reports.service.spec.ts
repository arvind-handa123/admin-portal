import { TestBed } from '@angular/core/testing';

import { AgentReportsService } from './agent-reports.service';

describe('AgentReportsService', () => {
  let service: AgentReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
