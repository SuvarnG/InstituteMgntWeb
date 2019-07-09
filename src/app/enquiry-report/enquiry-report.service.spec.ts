import { TestBed } from '@angular/core/testing';

import { EnquiryReportService } from './enquiry-report.service';

describe('EnquiryReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnquiryReportService = TestBed.get(EnquiryReportService);
    expect(service).toBeTruthy();
  });
});
