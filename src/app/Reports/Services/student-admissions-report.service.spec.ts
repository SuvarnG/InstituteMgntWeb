import { TestBed } from '@angular/core/testing';

import { StudentAdmissionsReportService } from '../Services/student-admissions-report.service';

describe('StudentAdmissionsReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentAdmissionsReportService = TestBed.get(StudentAdmissionsReportService);
    expect(service).toBeTruthy();
  });
});
