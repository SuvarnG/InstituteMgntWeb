import { TeacherCoursesService } from './teacher-courses.service';
import { TestBed } from '@angular/core/testing';


describe('TeacherCoursesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherCoursesService = TestBed.get(TeacherCoursesService);
    expect(service).toBeTruthy();
  });
});
