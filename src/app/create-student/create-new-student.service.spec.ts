import { TestBed } from '@angular/core/testing';

import { CreateNewStudentService } from './create-new-student.service';

describe('CreateNewStudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateNewStudentService = TestBed.get(CreateNewStudentService);
    expect(service).toBeTruthy();
  });
});
