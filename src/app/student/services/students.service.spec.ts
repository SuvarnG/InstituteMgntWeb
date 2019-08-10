import { TestBed } from '@angular/core/testing';

import { StudentslistService } from './students.service';

describe('StudentslistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentslistService = TestBed.get(StudentslistService);
    expect(service).toBeTruthy();
  });
});
