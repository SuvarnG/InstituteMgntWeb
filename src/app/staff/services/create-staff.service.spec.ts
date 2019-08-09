import { CreateStaffService } from './create-staff.service';
import { TestBed } from '@angular/core/testing';


describe('TeacherCoursesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateStaffService = TestBed.get(CreateStaffService);
    expect(service).toBeTruthy();
  });
});
