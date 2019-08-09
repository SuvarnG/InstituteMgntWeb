import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdmissionsReportComponent } from './student-admissions-report.component';

describe('StudentAdmissionsReportComponent', () => {
  let component: StudentAdmissionsReportComponent;
  let fixture: ComponentFixture<StudentAdmissionsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAdmissionsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAdmissionsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
