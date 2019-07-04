import { CourseFees, Users } from './../Models/Students';
import { CoursetypeService } from './../coursetype/coursetype.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms'
import { CreateNewStudentService } from './create-new-student.service';
import { Students, CreateStudent, FeesTransaction, User, CourseType, Courses, RecentStudent } from '../Models/Students';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { template } from '@angular/core/src/render3';
import { formGroupNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  modalRef: BsModalRef;
  registerForm: FormGroup;
  submitted = false;
  submitStudentFees = false;
  submitStudentLogin = false;
  showSelected: Boolean = false;
  registerStudentCourse: FormGroup;
  registerStudentLogin: FormGroup;
  selectedUserValue: number;
  selectedFeesValue: number;
  selectedRoleValue: number;
  selectedStudentIdValue: number;
  selectedCourseFeesValue: number;
  selectedStudentFirstName: string;
  selectedStudentLastName: string;
  selectedStudentEmail: string;
  CalculatedDiscountedAmount: number;
  selectedPayingFeesNow: boolean;
  NewStudentid: number;
  newRecentStudent: RecentStudent[];
  fileToUpload: File = null;
  courseFees: CourseFees[];
  getRecentStudent: RecentStudent[];
  users: Users[];
  courses:Courses[];
  courseTypeList:CourseType[];

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder,
    public CreateNewStudentService: CreateNewStudentService,
    private router: Router,
    public _DomSanitizationService: DomSanitizer,
    private coursetypeService: CoursetypeService) { }


  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      Address1: ['Kondhwa', Validators.required],
      Address2: [],
      city: ['Pune', Validators.required],
      state: ['Maharashtra', Validators.required],
      zipCode: ['411048', Validators.required],
      PAddress1: ['Kondhwa', Validators.required],
      PAddress2: [],
      Pcity: ['Pune', Validators.required],
      Pstate: ['Maharashtra', Validators.required],
      PzipCode: ['411048', Validators.required],
      IsDocumentSubmitted: [],
      dateOfBirth: ['', Validators.required],
      bloodgroup: ['', Validators.required],
      ContactNo: ['', [Validators.required, this.phoneNumberValidator]],
      EmergencyContactNo: ['', [Validators.required, this.phoneNumberValidator]],
      Email: ['', [Validators.required, Validators.email]],
      gender: ['Male', Validators.required],
      payingFeesNow: ['', Validators.required],
      Documents: [],
      Photo: ['../../assets/images/MProfile.jpg'],
      NewImage: ['']
    });




    this.registerStudentCourse = this.formBuilder.group({
      StudentID: ['', Validators.required],
      CourseType: ['', Validators.required],
      CourseName: ['', Validators.required],
      CourseFees: ['', Validators.required],
      FeesAmount: ['', Validators.required],
      AnyDiscount: ['', Validators.required],
      NewDiscountedAmount: ['', Validators.required],
      DateofPayment: ['', Validators.required],
      FeesTakenBy: ['', Validators.required],
      Remark: ['', Validators.required]
    },
    );


    this.registerStudentLogin = this.formBuilder.group({
      FirstName: ['', Validators.required],
      Lastname: ['', Validators.required],
      EMailId: ['', Validators.required],
      Role: ['', Validators.required],
      Password: ['', Validators.required],
      VerifyPassword: ['', Validators.required],
      CreatedBy: ['', Validators.required]
    });

  }

  selectAddress(event: any) {
    if (event.currentTarget.checked == true) {
      this.registerForm.controls.PAddress1.setValue(this.registerForm.controls.Address1.value)
      this.registerForm.controls.PAddress2.setValue(this.registerForm.controls.Address2.value)
      this.registerForm.controls.Pcity.setValue(this.registerForm.controls.city.value)
      this.registerForm.controls.Pstate.setValue(this.registerForm.controls.state.value)
      this.registerForm.controls.PzipCode.setValue(this.registerForm.controls.zipCode.value)

    }
    else {
      this.registerForm.controls.PAddress1.reset();
      this.registerForm.controls.PAddress2.reset();
      this.registerForm.controls.Pcity.reset();
      this.registerForm.controls.Pstate.reset();
      this.registerForm.controls.PzipCode.reset();
    }
  }


  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }


  matchValidator(group: FormGroup) {
    debugger;
    let password = this.registerStudentLogin.controls.Password.value;
    let verifyPassword = this.registerStudentLogin.controls.VerifyPassword.value;

    if (password == verifyPassword) {
      return null;
    }

    return {
      mismatch: true
    }
  }


  openModal(template: TemplateRef<any>) {
    debugger;
    this.submitted = true;
    if (this.registerForm.invalid) {
      return
    }

    //Create Student Function
    let body: CreateStudent = {
      Gender: this.registerForm.controls.gender.value,
      FirstName: this.registerForm.controls.firstName.value,
      MiddleName: this.registerForm.controls.middleName.value,
      LastName: this.registerForm.controls.lastName.value,
      Address1: this.registerForm.controls.Address1.value,
      Address2: this.registerForm.controls.Address2.value,
      City: this.registerForm.controls.city.value,
      State: this.registerForm.controls.state.value,
      STDCode: this.registerForm.controls.zipCode.value,
      DOB: this.registerForm.controls.dateOfBirth.value,
      BloodGroup: this.registerForm.controls.bloodgroup.value,
      ContactNo: this.registerForm.controls.ContactNo.value,
      EmergencyNo: this.registerForm.controls.EmergencyContactNo.value,
      EmailId: this.registerForm.controls.Email.value,
      PAddress1: this.registerForm.controls.PAddress1.value,
      PAddress2: this.registerForm.controls.PAddress2.value,
      PCity: this.registerForm.controls.Pcity.value,
      PState: this.registerForm.controls.Pstate.value,
      PSTDCode: this.registerForm.controls.PzipCode.value,
      //Photo:this.registerForm.controls.NewImage.value,
      Photo: this.CreateNewStudentService.thumbnailUrl,
      IsDocumentSubmitted: this.registerForm.controls.IsDocumentSubmitted.value,
      PayingFees: this.registerForm.controls.payingFeesNow.value
    };


    this.CreateNewStudentService.createNewStudent(body).subscribe(data =>
      // do something, if upload success
      this.CreateNewStudentService.getRecentlyCreatedStudent().subscribe(res => {
        this.getRecentStudent = res
      })
    );

    //Open Popup function
    if (this.registerForm.controls.payingFeesNow.value) {
      this.modalRef = this.modalService.show(template, {
        animated: true,
        backdrop: 'static'
      });
      this.coursetypeService.CourseTypeList().subscribe(res=>{
        this.courseTypeList=res
      });
      // this.CreateNewStudentService.GetCourseNameFromCourseType(this.selectedUserValue);
      this.CreateNewStudentService.getUsersListForFeesTaken().subscribe(res => {
        this.users = res
      });
    }
  }



  openModal2(template: TemplateRef<any>) {
    debugger;

    this.submitStudentFees = true;
    if (this.registerStudentCourse.invalid) {
      return
    }

    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static'
    });
    this.CreateNewStudentService.getRolesList();
  }


  get f() { return this.registerForm.controls; }

  get g() { return this.registerStudentCourse.controls; }

  get e() { return this.registerStudentLogin.controls }


  onSubmitStudentLogin() {
    debugger;
    this.submitStudentLogin = true;

    //stop here if form is invalid
    if (this.registerStudentLogin.invalid) {
      return;
    }
  }



  phoneNumberValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const valid = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(control.value)
    return valid
      ? null
      : { invalidNumber: { valid: false, value: control.value } }
  }

  showUpload() {
    this.showSelected = true;
  }

  hideUpload() {
    this.showSelected = false;
  }



  createStudentCourse(feesTransaction: FeesTransaction) {
    debugger;
    this.submitStudentFees = true;
    if (this.registerStudentCourse.invalid) {
      return
    }

    let body: FeesTransaction = {
      Id: 0,
      CourseId: this.registerStudentCourse.controls.CourseName.value,
      StudentId: this.selectedStudentIdValue,
      //StudentId:this.registerStudentCourse.controls.StudentID.value,
      CourseFees: this.registerStudentCourse.controls.CourseFees.value,
      NewDiscountedAmount: this.registerStudentCourse.controls.NewDiscountedAmount.value,
      DateOfPayment: this.registerStudentCourse.controls.DateofPayment.value,
      FeesPaid: this.registerStudentCourse.controls.FeesAmount.value,
      FeesTakenBy: this.registerStudentCourse.controls.FeesTakenBy.value,
      BranchId:1,
      InstituteId:1,
      //FeesTakenBy:sessionStorage.setItem('CurrentUser', JSON.stringify(auth)),
      CourseCompleted: false,
      Discount: this.registerStudentCourse.controls.AnyDiscount.value,
      TotalFees: this.registerStudentCourse.controls.NewDiscountedAmount.value,
      Remark: this.registerStudentCourse.controls.Remark.value,
      IsActive: true

    };

    if (confirm("Do you want to submit?")) {
      this.modalRef.hide();
      this.CreateNewStudentService.createStudentCourse(body).subscribe(data => { this.router.navigateByUrl('/StudentList') });
      //this.CreateNewStudentService.getRecentlyCreatedStudent();
    }
  }



  //   createStudentLogin(user: User) {
  //     debugger;

  //     this.submitStudentLogin = true;
  //     if (this.registerStudentLogin.invalid) {
  //       return
  //     }

  //     let body: User = {
  //       Id: 0,
  //       //StudentId:this.registerStudentLogin.controls.StudentID.value,
  //       FirstName: this.selectedStudentFirstName,
  //       LastName: this.selectedStudentLastName,
  //       Email: this.selectedStudentEmail,
  //       Password: this.registerStudentLogin.controls.VerifyPassword.value,
  //       RoleId: this.selectedRoleValue,
  //       CreatedBy: this.registerStudentLogin.controls.CreatedBy.value

  //     };

  //     if(this.registerStudentLogin.controls.Password.value!=this.registerStudentLogin.controls.VerifyPassword.value)
  //     {
  //       alert("Password did not matched..Please verify password")
  //     }
  //     else
  //     {
  //     if (confirm("Are you sure to create a login?")) {
  //       this.CreateNewStudentService.createStudentLogin(body).subscribe((data) => 
  //         {this.modalRef.hide(),
  //         this.router.navigateByUrl('/StudentList') });

  //     }
  //   }
  // }



  handleFileInput(event: any) {
    debugger;
    if (event.target.files.length) {
      const file = event.target.files[0];
      this.registerForm.get('Documents').setValue(file);
    }
  }

  handlePhotoInput(event: any) {
    debugger;
    if (event.target.files.length) {
      const file = event.target.files[0];
      this.registerForm.get('Photo').setValue(file);
    }
  }

  onUploadFile() {
    debugger;
    const formData = new FormData();
    formData.append('profile', this.registerForm.get('Documents').value)//this.registerForm.get('Documents').value);
    this.CreateNewStudentService.postFile(formData).subscribe(res => {
      console.log(res);
    });
  }

  // onUploadPhoto()
  // {
  //   debugger;
  //   const formData = new FormData();
  //   formData.append('profile',this.registerForm.get('Photo').value)//this.registerForm.get('Documents').value);
  //   this.CreateNewStudentService.postPhoto(formData).subscribe(res=>{
  //         console.log(res);        
  //   });
  // }


  onUploadPhoto() {
    debugger;
    const formData = new FormData();
    formData.append('profile', this.registerForm.get('Photo').value)//this.registerForm.get('Documents').value);
    this.CreateNewStudentService.postPhoto(formData)
  }

  selectStudentId(event) {
    debugger;
    this.selectedStudentIdValue = event.target.value;
  }

  selectStudentFirstName(event) {
    debugger;
    this.selectedStudentFirstName = event.target.value;
  }

  selectStudentLastName(event) {
    debugger;
    this.selectedStudentLastName = event.target.value;
  }

  selectStudentEmail(event) {
    debugger;
    this.selectedStudentEmail = event.target.value;
  }

  selectCourseFees(event) {
    this.selectedCourseFeesValue = event.target.value;
  }

  selectUser(event) {
    debugger;
    this.selectedUserValue = event.target.value;
  }

  selectFees(event) {
    debugger;
    this.selectedFeesValue = event.target.value;
  }

  selectRole(event) {
    debugger;
    this.selectedRoleValue = event.target.value;
  }


  selectPayingFeesNow(event) {
    debugger;
    this.selectedPayingFeesNow = event.target.value;
  }

  getCourseNameFromCourseType(courses: Courses) {
    debugger;
    this.CreateNewStudentService.getCourseNameFromCourseType(this.selectedUserValue).subscribe(res=>{
      this.courses=res
    })

  }

  getCourseFeesFromCourseName(courses: Courses) {
    debugger;

    this.CreateNewStudentService.getCourseFeesFromCourseName(this.selectedFeesValue).subscribe(res => {
      this.courseFees = res
    })

  }

  calculateDiscountedAmount() {
    debugger;
    this.CalculatedDiscountedAmount = ((this.registerStudentCourse.controls.CourseFees.value) - ((this.registerStudentCourse.controls.AnyDiscount.value / 100) * this.registerStudentCourse.controls.CourseFees.value))
    this.registerStudentCourse.controls.NewDiscountedAmount.setValue(this.CalculatedDiscountedAmount)

  }

}