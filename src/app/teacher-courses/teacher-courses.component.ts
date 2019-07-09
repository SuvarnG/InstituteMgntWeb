import { Courses, CourseType } from './../Models/Students';
import { CreateNewStudentService } from './../create-student/create-new-student.service';
import { CoursetypeService } from './../coursetype/coursetype.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherCoursesService } from './teacher-courses.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Roles } from '../Models/Students';
import { Utils } from '../Utils';


@Component({
  selector: 'app-teacher-courses',
  templateUrl: './teacher-courses.component.html',
  styleUrls: ['./teacher-courses.component.css']
})
export class TeacherCoursesComponent implements OnInit {
  shown: boolean = false;
  add: boolean = true;
  modalRef: BsModalRef;
  registerStaffForm: FormGroup;
  staffLoginForm: FormGroup;
  courseForm: FormGroup;
  submitted = false;
  errorMessage: string;
  public selectedCourseTypeValue: Number;
  public selectedCourseNameValue: string;
  disabled: boolean = true;
  newEmail: string;
  FName: string;
  LName: string;
  courseNameList: Courses[];
  courseTypeList: CourseType[];
  roles: Roles[];

  constructor(private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private teacherCoursesService: TeacherCoursesService,
    public _DomSanitizationService: DomSanitizer,
    private coursetypeService: CoursetypeService,
    private createNewStudentService: CreateNewStudentService) { }

  ngOnInit() {
    this.registerStaffForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      MiddleName: ['', Validators.required],
      Gender: [''],
      LastName: ['', Validators.required],
      DateOfJoining: ['', Validators.required],
      ContactNo: ['', Validators.required],
      Email: ['', Validators.required],
      PreviousExperience: [''],
      DateOfLeaving: [],
      LeavingReason: [],
      DOB: ['', Validators.required],
      Photo: [''],
      Address1: ['Kondhwa', Validators.required],
      Address2: [],
      gridCheck1: [],
      City: ['Pune', Validators.required],
      State: ['Maharashtra', Validators.required],
      STDCode: ['411048', Validators.required],
      P_Address1: ['', Validators.required],
      P_Address2: [],
      P_City: ['', Validators.required],
      P_State: ['', Validators.required],
      P_STDCode: ['', Validators.required],
      P_ContactNo: ['', Validators.required],
      EmergencyNo: ['', Validators.required],
      PreviousWorkName: [''],
      IsCv: [],
      IsFixedPayment: [],
      Document: [],
      BloodGroup: ['', Validators.required],
      coursesArray: this.formBuilder.array([
        this.addNewRowForm()
      ])
    });

    this.courseForm = this.formBuilder.group({
      CourseType: ['', Validators.required],
      CourseName: ['', Validators.required]
    });
    this.staffLoginForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      Role: ['', Validators.required],
      Password: ['', Validators.required],
      VerifyPassword: ['', Validators.required],
    });
  }
  get f() { return this.registerStaffForm.controls; }
  get login() { return this.staffLoginForm.controls; }

  onSubmit(template: TemplateRef<any>) {
    debugger;
    // stop here if form is invalid
    if (this.registerStaffForm.invalid == true) {
      this.submitted = true;
      return;
    }
    else {
      if (this.registerStaffForm.controls.IsFixedPayment.value == "false") {
        this.coursetypeService.courseTypeList().subscribe(res => {
          this.courseTypeList = res
        });
        // this.teacherCoursesService.GetCourseName(this.selectedCourseTypeValue);
        this.modalRef = this.modalService.show(template);
      }
      this.newEmail = this.registerStaffForm.controls.Email.value;
      this.FName = this.registerStaffForm.controls.FirstName.value;
      this.LName = this.registerStaffForm.controls.LastName.value;
      let body = {
        FirstName: this.registerStaffForm.controls.FirstName.value,
        MiddleName: this.registerStaffForm.controls.MiddleName.value,
        LastName: this.registerStaffForm.controls.LastName.value,
        Gender: this.registerStaffForm.controls.Gender.value,
        DateOfJoining: this.registerStaffForm.controls.DateOfJoining.value,
        BloodGroup: this.registerStaffForm.controls.BloodGroup.value,
        ContactNo: this.registerStaffForm.controls.ContactNo.value,
        Email: this.registerStaffForm.controls.Email.value,
        PreviousExperience: this.registerStaffForm.controls.PreviousExperience.value,
        DateOfLeaving: this.registerStaffForm.controls.DateOfLeaving.value,
        LeavingReason: this.registerStaffForm.controls.LeavingReason.value,
        DOB: this.registerStaffForm.controls.DOB.value,
        //Photo: this.registerStaffForm.controls.Photo.value.name,
        Photo: this.teacherCoursesService.thumbnailUrl,
        Address1: this.registerStaffForm.controls.Address1.value,
        Address2: this.registerStaffForm.controls.Address2.value,
        City: this.registerStaffForm.controls.City.value,
        State: this.registerStaffForm.controls.State.value,
        STDCode: this.registerStaffForm.controls.STDCode.value,
        P_Address1: this.registerStaffForm.controls.P_Address1.value,
        P_Address2: this.registerStaffForm.controls.P_Address2.value,
        P_City: this.registerStaffForm.controls.P_City.value,
        P_State: this.registerStaffForm.controls.P_State.value,
        P_STDCode: this.registerStaffForm.controls.P_STDCode.value,
        P_ContactNo: this.registerStaffForm.controls.P_ContactNo.value,
        EmergencyNo: this.registerStaffForm.controls.EmergencyNo.value,
        PreviousWorkName: this.registerStaffForm.controls.PreviousWorkName.value,
        IsCv: this.registerStaffForm.controls.IsCv.value,
        IsFixedPayment: this.registerStaffForm.controls.IsFixedPayment.value,
        BranchId: this.user.BranchId,
        InstituteId: this.user.InstituteId
      }
      this.teacherCoursesService.saveStaff(body)
        .subscribe((data) => {
        }, error => this.errorMessage = error)
      alert("Success");

    }

  }
  openModal(template: TemplateRef<any>) {
    debugger;
    if (this.registerStaffForm.controls.IsFixedPayment.value == true) {
      this.coursetypeService.courseTypeList();
      // this.teacherCoursesService.GetCourseName(this.selectedCourseTypeValue);
      this.modalRef = this.modalService.show(template);
    }
  }

  Show() {
    if (this.shown == false) {
      this.shown = true;
    }
  }
  Hide() {
    if (this.shown == true) {
      this.shown = false;
    }
  }

  addNewRow(): void {
    this.disabled = !this.disabled;
    (<FormArray>this.registerStaffForm.get('coursesArray')).push(this.addNewRowForm());
  }

  removeCourse(courseGroupIndex: number): void {
    (<FormArray>this.registerStaffForm.get('coursesArray')).removeAt(courseGroupIndex);
  }

  addNewRowForm(): FormGroup {
    return this.formBuilder.group({
      CourseType: [],
      CourseName: []
    });
  }
  selectCourseType(event) {
    this.selectedCourseTypeValue = event.target.value;
    this.createNewStudentService.getCourseNameFromCourseType(this.selectedCourseTypeValue).subscribe(res => {
      this.courseNameList = res
    });
  }
  selectCourseName(event) {
    this.selectedCourseNameValue = event.target.value;
  }

  checkAll(event: any) {
    if (event.currentTarget.checked == true) {
      this.registerStaffForm.controls.P_Address1.setValue(this.registerStaffForm.controls.Address1.value),
        this.registerStaffForm.controls.P_Address2.setValue(this.registerStaffForm.controls.Address2.value),
        this.registerStaffForm.controls.P_City.setValue(this.registerStaffForm.controls.City.value),
        this.registerStaffForm.controls.P_State.setValue(this.registerStaffForm.controls.State.value),
        this.registerStaffForm.controls.P_STDCode.setValue(this.registerStaffForm.controls.STDCode.value),
        this.registerStaffForm.controls.P_ContactNo.setValue(this.registerStaffForm.controls.ContactNo.value)

    }
    else {
      this.registerStaffForm.controls.P_Address1.reset(),
        this.registerStaffForm.controls.P_Address2.reset(),
        this.registerStaffForm.controls.P_City.reset(),
        this.registerStaffForm.controls.P_State.reset(),
        this.registerStaffForm.controls.P_STDCode.reset(),
        this.registerStaffForm.controls.P_ContactNo.reset()
    }
  }


  onAddCourses(staffLoginTemplate: TemplateRef<any>) {
    let body = {
      CourseType: this.selectedCourseTypeValue,
      Courses: this.selectedCourseNameValue
    }
    this.teacherCoursesService.addTeacherCourses(body)
      .subscribe((data) => {
        this.modalRef.hide();
        let body = {
          FirstName: this.FName,
          LastName: this.LName,
          Email: this.newEmail,
        }
        this.staffLoginForm.patchValue(body);
        this.teacherCoursesService.getRoleList().subscribe(res => {
          this.roles = res
        });
        this.modalRef = this.modalService.show(staffLoginTemplate);
      }, error => this.errorMessage = error)
  }

  public user = Utils.GetCurrentUser();

  onStaffLogin() {
    debugger;
    if (this.staffLoginForm.controls.Password.value != this.staffLoginForm.controls.VerifyPassword.value) {
      alert("Re-type Password");
    }
    else {
      let body = {
        FirstName: this.staffLoginForm.controls.FirstName.value,
        LastName: this.staffLoginForm.controls.LastName.value,
        Email: this.staffLoginForm.controls.Email.value,
        RoleId: this.staffLoginForm.controls.Role.value,
        Password: this.staffLoginForm.controls.Password.value,
        Address: 'Wanawadi',
        CreatedBy: '1',
        Contact: '111111111111',
        Gender: 'Male',
        LastLoginTime: '2019-06-11 08:43:25.650',
        IsActive: true,
        Photo: this.teacherCoursesService.thumbnailUrl,
        BranchId: this.user.BranchId,
        InstituteId: this.user.InstituteId

      }
      this.teacherCoursesService.addStaffInUsers(body)
        .subscribe((data) => {
          this.modalRef.hide()
          alert("Staff Created successfully");
          this.router.navigate(['/StaffList']);
        }, error => this.errorMessage = error)
      alert("Success");
    }
  }

  onImageSelected(event: any) {
    debugger;
    if (event.target.files.length) {
      const file = event.target.files[0];
      this.registerStaffForm.get('Photo').setValue(file);
    }
  }

  // onUploadPhoto()
  // {
  //   debugger;
  //   const formData = new FormData();
  //   formData.append('profile', this.registerStaffForm.get('Photo').value);
  //   this.teacherCoursesService.uploadPhoto(formData).subscribe(res=>{
  //         console.log(res);            
  //   });
  //   alert("Photo uploaded successfully");  
  // }


  onUploadPhoto() {
    debugger;
    const formData = new FormData();
    formData.append('profile', this.registerStaffForm.get('Photo').value);
    this.teacherCoursesService.postPhoto(formData);

  }

  onFileSelected(event: any) {
    debugger;
    if (event.target.files.length) {
      const file = event.target.files[0];
      this.registerStaffForm.get('Document').setValue(file);
    }
  }
  onUploadFile() {
    debugger;
    const formData = new FormData();
    formData.append('File', this.registerStaffForm.get('Document').value);
    this.teacherCoursesService.uploadFile(formData).subscribe(res => {
      console.log(res);
    });
    alert("CV uploaded successfully");
  }
}
