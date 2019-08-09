import { TestBed } from '@angular/core/testing';

import { FeesCollectionReportService } from '../Services/fees-collection-report.service';

describe('FeesCollectionReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeesCollectionReportService = TestBed.get(FeesCollectionReportService);
    expect(service).toBeTruthy();
  });
});
