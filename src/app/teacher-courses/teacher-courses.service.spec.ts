import { TestBed } from '@angular/core/testing';

import { TeacherCoursesService } from './teacher-courses.service';

describe('TeacherCoursesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherCoursesService = TestBed.get(TeacherCoursesService);
    expect(service).toBeTruthy();
  });
});
