import { Component, OnInit, TemplateRef } from '@angular/core';
import { CoursesService } from './courses.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CourseType, Course } from '../Model/CourseType';


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
  public fullname: Course[]

  constructor(private modalService: BsModalService, private CoursesService: CoursesService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      CourseId: [],
      CourseTypeId: ['', Validators.required],
      // CourseTypeName:['', Validators.required],
      ShortName: ['', Validators.required],
      FullName: ['', Validators.required],
      IsPercentage: ['', Validators.required],
      Fees: ['', Validators.required],
      Duration: ['', Validators.required],
      // IsActive: ['', Validators.required],
      Percentage: ['', Validators.required],

    })
    this.getCourses();
    this.getCourseTypeList();


    this.UpdateFormGroup = this.formBuilder.group({
      CourseId: [],
      CourseTypeId: ['', Validators.required],
      CourseTypeName: ['', Validators.required],
      ShortName: ['', Validators.required],
      FullName: ['', Validators.required],
      IsPercentage: ['', Validators.required],
      Fees: ['', Validators.required],
      Duration: ['', Validators.required],
      // IsActive: ['', Validators.required],
      Percentage: ['', Validators.required],
    })
  }


  getCourses() {
    debugger;
    this.CoursesService.courseList().subscribe(res => {
      this.course = res;
    });
    //    console.log(JSON.stringify(this.banks));
  }

  getCourseTypeList() {
    debugger;
    this.CoursesService.GetCourseTypeList().subscribe(res => {
      this.coursetype = res; console.log("test", this.coursetype)
    });
  }
  getShortName(courseTypeId: number) {
    debugger;
    this.CoursesService.GetShortName(courseTypeId).subscribe(res => { this.courses = res; console.log("test", this.courses) });

  }

  getFullName(courseId: number) {
    debugger;
    this.selectedCourse = this.courses.find(x => x.CourseId ==  courseId);
  }
  clearForm() {
    this.createForm.reset()
      
  }

  Delete(CourseId,FullName) {
    debugger;
    var ans = confirm("Do you want to delete CourseId : " + CourseId);
    if (ans) {
      this.CoursesService.Delete(CourseId).subscribe(data => {
        this.getCourses();
      }, error => console.error(error))
    }
  }

  AddCourses(Addtemplate: TemplateRef<any>) {
    debugger;
    // this.getCourseTypeList();
    this.modalRef = this.modalService.show(Addtemplate, {

      animated: true,
      backdrop: 'static'
    });

  }
  get f() { return this.createForm.controls; }
  get fu() { return this.UpdateFormGroup.controls; }

  onSubmit() {
    debugger;
    this.submitted = true;

    // stop here if form is invalid
    if (this.createForm.invalid) {
      return;
    }
    else {
      let body = {
        CourseId: this.createForm.controls.CourseId.value,
        CourseTypeId: this.createForm.controls.CourseTypeId.value,
        //CourseTypeName:this.createForm.controls.CourseTypeName.value,
        ShortName: this.createForm.controls.ShortName.value,
        FullName: this.createForm.controls.FullName.value,
        IsPercentage: this.createForm.controls.IsPercentage.value,
        Fees: this.createForm.controls.Fees.value,
        Duration: this.createForm.controls.Duration.value,
        // IsActive: this.createForm.controls.IsActive.value,
        Percentage: this.createForm.controls.Percentage.value,


      };
      this.CoursesService.createCourse(body).subscribe((data) => {
        this.modalRef.hide();
        this.submitted=false;
        this.getCourses();

      })
    }

  }
  Edit(editTemplate: TemplateRef<any>, course) {
    debugger;
    this.getShortName(course.CourseTypeId);
 this.getFullName(course.CourseId);
    // let selectedCourse = {
    //   CourseId: courses.CourseId,
    //   CourseTypeId: courses.CourseTypeId,
    //   CourseTypeName: courses.CourseTypeName,
    //   ShortName: courses.ShortName,
    //   FullName: courses.FullName,
    //   IsPercentage: courses.IsPercentage,
    //   Fees: courses.Fees,
    //   Duration: courses.Duration,
    //   // IsActive: courses.value,
    //   Percentage: courses.Percentage,
    // }
    this.UpdateFormGroup.patchValue(course);

    
    this.modalRef = this.modalService.show(editTemplate, {
      
      animated: true,
      backdrop: 'static'
     
    });
  }

  Update() {
    debugger;
    this.submitted = true;

    // stop here if form is invalid
    if (this.UpdateFormGroup.invalid) {
      return;
    }
    debugger;
    console.log(this.fu)
    let body = {
      CourseId: this.UpdateFormGroup.controls.CourseId.value,
      CourseTypeId: this.UpdateFormGroup.controls.CourseTypeId.value,
      CourseTypeName: this.UpdateFormGroup.controls.CourseTypeName.value,
      ShortName: this.selectedCourse.ShortName,
      FullName: this.UpdateFormGroup.controls.FullName.value,
      IsPercentage: this.UpdateFormGroup.controls.IsPercentage.value,
      Fees: this.UpdateFormGroup.controls.Fees.value,
      Duration: this.UpdateFormGroup.controls.Duration.value,
      Percentage: this.UpdateFormGroup.controls.Percentage.value,
    }
    this.CoursesService.Edit(body).subscribe(data => {
      this.modalRef.hide();
      //console.log('courses' +JSON.stringify())
      this.getCourses();
    }, error => console.error(error))
  }
}
