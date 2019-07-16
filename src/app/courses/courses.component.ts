import { CoursetypeService } from './../coursetype/coursetype.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CoursesService } from './courses.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CourseType, Course } from '../Model/CourseType';
import { Subject } from 'rxjs';
import { Utils } from '../Utils';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  modalRef: BsModalRef;
  createForm: FormGroup;
  UpdateFormGroup: FormGroup;
  submitted = false;
  returnUrl: string;
  selectedCourse: Course;
  public course = [];
  public ID: number;
  public coursetype: CourseType[];
  public courses: Course[];
  public fullname: Course[];
  CalculateIsPercentage: number;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  CourseTypeId: number;
  CourseId: number;


  @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;


  constructor(
    private modalService: BsModalService,
    private CoursesService: CoursesService,
    private formBuilder: FormBuilder,
    private coursetypeService: CoursetypeService) { }

  ngOnInit() {
    this.dtOptions = {
      retrieve: true,
      pagingType: 'full_numbers',
      pageLength: 4
    };
    this.createForm = this.formBuilder.group({
      CourseId: [],
      CourseTypeId: ['', Validators.required],
      ShortName: ['', Validators.required],
      FullName: ['', Validators.required],
      IsPercentage: [],
      Fees: ['', Validators.required],
      Duration: ['', Validators.required],
      Percentage: [],

    })
    this.getCourses(this.user.InstituteId, this.user.BranchId);
    this.getCourseTypeList();


    this.UpdateFormGroup = this.formBuilder.group({
      CourseTypeId: [''],
      ShortName: ['', Validators.required],
      FullName: ['', Validators.required],
      IsPercentage: [''],
      Fees: ['', Validators.required],
      Duration: ['', Validators.required],
      Percentage: ['', Validators.required],
    })
  }


  ngAfterViewInit(): void {this.dtTrigger.next();}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
    });
}

  public user = Utils.GetCurrentUser();

  getCourses(InstituteId: number, BranchId: number) {
    this.CoursesService.courseList(InstituteId, BranchId).subscribe(res => {
      this.course = res;
      this.rerender();
    });
  }

  getCourseTypeList() {
    this.coursetypeService.courseTypeList().subscribe(res => {
      this.coursetype = res; console.log("test", this.coursetype)
    });
  }
  getShortName(courseTypeId: number) {
    this.CoursesService.getShortName(courseTypeId).subscribe(res => {
      this.courses = res; console.log("test", this.courses)
    });

  }

  clearForm() {
    this.createForm.reset()
  }

  Delete(ID, FullName) {
    var ans = confirm("Do you want to delete this course : " + ID);
    if (ans) {
      this.CoursesService.delete(ID).subscribe(data => {
        this.getCourses(this.user.InstituteId, this.user.BranchId);
      }, error => console.error(error))
    }
  }

  AddCourses(Addtemplate: TemplateRef<any>) {
    this.createForm.reset();
    this.modalRef = this.modalService.show(Addtemplate, {
      animated: true,
      backdrop: 'static',
      class: 'modal-xl'
    });

  }
  get f() { return this.createForm.controls; }
  get fu() { return this.UpdateFormGroup.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createForm.invalid) {
      return;
    }
    else {
      let body = {
        CourseId: this.createForm.controls.CourseId.value,
        CourseTypeId: this.createForm.controls.CourseTypeId.value,
        ShortName: this.createForm.controls.ShortName.value,
        FullName: this.createForm.controls.FullName.value,
        IsPercentage: this.createForm.controls.IsPercentage.value,
        Fees: this.createForm.controls.Fees.value,
        Duration: this.createForm.controls.Duration.value,
        Percentage: this.createForm.controls.Percentage.value,
        BranchId: this.user.BranchId,
        InstituteId: this.user.InstituteId

      };
      this.CoursesService.createCourse(body).subscribe((data) => {
        this.modalRef.hide();
        this.submitted = false;
        this.CoursesService.courseList(this.user.InstituteId, this.user.BranchId).subscribe(res => {
          this.course = res;
          this.rerender();
        });
        
      })
    }
  }

  Edit(editTemplate: TemplateRef<any>, course) {

    this.CourseTypeId = course.CourseTypeId;
    this.CourseId = course.CourseId;
    this.selectedCourse = course.FullName;
    this.UpdateFormGroup.patchValue({
      CourseTypeId: course.CourseTypeName,
      ShortName: course.ShortName,
      FullName: course.FullName,
      IsPercentage: course.IsPercentage,
      Percentage: course.Percentage,
      Fees: course.Fees,
      Duration: course.Duration
    })
    this.modalRef = this.modalService.show(editTemplate, {
      animated: true,
      backdrop: 'static',
      class: 'modal-xl'
    });
  }

  Update() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.UpdateFormGroup.invalid) {
      return;
    }
    let body = {
      CourseId: this.CourseId,
      CourseTypeId: this.CourseTypeId,
      CourseTypeName: this.UpdateFormGroup.controls.CourseTypeId.value,
      ShortName: this.UpdateFormGroup.controls.ShortName.value,
      FullName: this.UpdateFormGroup.controls.FullName.value,
      IsPercentage: this.UpdateFormGroup.controls.IsPercentage.value,
      Fees: this.UpdateFormGroup.controls.Fees.value,
      Duration: this.UpdateFormGroup.controls.Duration.value,
      Percentage: this.UpdateFormGroup.controls.Percentage.value,
    }
    this.CoursesService.edit(body).subscribe(data => {
      this.modalRef.hide();
      this.CoursesService.courseList(this.user.InstituteId, this.user.BranchId).subscribe(res => {
        this.course = res;
        this.rerender();
      });
    }, error => console.error(error))
   
  }

  calculateIsPercentage() {
    this.CalculateIsPercentage = ((this.createForm.controls.Fees.value / 2) / 100)
    this.createForm.controls.Percentage.setValue(this.CalculateIsPercentage)
  }
}
