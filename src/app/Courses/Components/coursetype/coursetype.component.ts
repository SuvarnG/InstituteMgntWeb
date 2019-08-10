import { CourseType } from './../../../shared/Model/Students';
import { CoursesService } from './../../../Courses/Services/courses.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-coursetype',
  templateUrl: './coursetype.component.html',
  styleUrls: ['./coursetype.component.css']
})
export class CoursetypeComponent {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(private coursesService : CoursesService ,
    private modalService: BsModalService,
    private formBuilder: FormBuilder) { }

  modalRef: BsModalRef;
  createCourseType: FormGroup;
  editCourseForm: FormGroup;
  submitted = false;
  returnUrl: string;
  public ID: number;
  public courseType: CourseType[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  filter: any;

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: false,
      searching: false
    };
    this.getCourseType();

    this.createCourseType = this.formBuilder.group({
      CourseTypeName: ['', Validators.required]
    });
    this.editCourseForm = this.formBuilder.group({
      CourseTypeId: ['', Validators.required],
      CourseTypeName: ['', Validators.required]
    });

  }

  ngAfterViewInit(): void { this.dtTrigger.next(); }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  get f() { return this.createCourseType.controls; }
  get fu() { return this.editCourseForm.controls; }

  getCourseType() {
    this.coursesService.courseTypeList().subscribe(res => {
      this.courseType = res;
      this.rerender();

    });
  }

  //Create CourseType
  createNewCourse(addtemplate: TemplateRef<any>) {
    this.createCourseType.reset();
    this.modalRef = this.modalService.show(addtemplate, {
      animated: true,
      backdrop: 'static'
    });

  };



  createCourseName(CreateCourseName: string, courseTypeName = []) {
    this.submitted = true;
    if (this.createCourseType.invalid) {
      return;
    }

    for (let i = 0; i < courseTypeName.length; i++) {
      if (CreateCourseName.toLowerCase() == courseTypeName[i]['CourseTypeName'].toLowerCase()) {
        alert('Sorry, This coursetype is already in the list')
        return

      }
    }



    this.submitted = false;

    this.coursesService.createCourseType(CreateCourseName).subscribe(data => {
      this.modalRef.hide();
      this.getCourseType();
      this.rerender();
    }, error => console.error(error))
  }


  editCourseType(editTemplate: TemplateRef<any>, coursetype) {
    this.editCourseForm.patchValue(coursetype);
    this.modalRef = this.modalService.show(editTemplate, {
      animated: true,
      backdrop: 'static'
    });
  }

  updateCourseType(courseTypeName = []) {
    this.submitted = true;
    //stop here if form is invalid
    if (this.editCourseForm.invalid) {
      return;
    }

    for (let i = 0; i < courseTypeName.length; i++) {
      if (this.editCourseForm.controls.CourseTypeName.value.toLowerCase() == courseTypeName[i]['CourseTypeName'].toLowerCase()) {
        alert('Sorry, This coursetype is already in the list')
        return

      }
    }

    this.submitted = false;
    let body = {
      CourseTypeName: this.editCourseForm.controls.CourseTypeName.value,
      CourseTypeId: this.editCourseForm.controls.CourseTypeId.value,
    }
    this.coursesService.editCourseType(body).subscribe(data => {
      this.modalRef.hide();
      this.getCourseType();
    }, error => console.error(error))
  }

  clearForm() {
    this.createCourseType.reset()
  }


}
