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


@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  modalRef: BsModalRef;
  registerForm: FormGroup;
  submitted = false;
  submitStudentFees=false;
  submitStudentLogin=false;
  showSelected: Boolean = false;
  registerStudentCourse: FormGroup;
  registerStudentLogin: FormGroup;
  selectedUserValue: number;
  selectedFeesValue: number;
  selectedRoleValue: number;
  selectedStudentIdValue: number;
  selectedCourseFeesValue: number;
  //selectedCreatedBy:number;
  selectedStudentFirstName: string;
  selectedStudentLastName: string;
  selectedStudentEmail: string;
  CalculatedDiscountedAmount: number;
  selectedPayingFeesNow: boolean;
  NewStudentid: number;
  newRecentStudent: RecentStudent[];
  fileToUpload: File = null;

 // public listCourseType: CourseType[];
  // public template: TemplateRef<any>

  // public registerStudentCourse = new FormGroup ({
  //   StudentID: new FormControl(['',Validators.required]),
  //   CourseType:new FormControl(['',Validators.required]),
  //   CourseName:new FormControl(['',Validators.required]),
  //   FeesAmount:new FormControl(['',Validators.required]),
  //   AnyDiscount:new FormControl(['',Validators.required]),
  //   NewDiscountedAmount:new FormControl(['',Validators.required]),
  //   DateofPayment:new FormControl(['',Validators.required]),
  //   FeesTakenBy:new FormControl(['',Validators.required]),
  // });

  // public registerStudentLogin:FormGroup=  new FormGroup({
  //   FirstName:new FormControl(['',Validators.required]),
  //   Lastname:new FormControl(['',Validators.required]),
  //   EMailId:new FormControl(['',Validators.required]),
  //   Role:new FormControl(['',Validators.required]),
  //   Password:new FormControl(['',Validators.required]),
  //   VerifyPassword:new FormControl(['',Validators.required]),

  // });


  constructor(private modalService: BsModalService, private formBuilder: FormBuilder,
    private CreateNewStudentService: CreateNewStudentService,
    private router: Router

  ) {

    // this.registerStudentCourse=this.formBuilder.group({
    //   StudentID:['',Validators.required],
    //   CourseType:['',Validators.required],
    //   CourseName:['',Validators.required],
    //   CourseFees:['',Validators.required],
    //   Fees:['',Validators.required],
    //   FeesAmount:['',Validators.required],
    //   AnyDiscount:['',Validators.required],
    //   NewDiscountedAmount:['',Validators.required],
    //   DateofPayment:['',Validators.required],
    //   FeesTakenBy:['',Validators.required],
    //   Remark:['',Validators.required]
    // },
    // );

  }




  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      Address1: ['', Validators.required],
      Address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      PAddress1: ['', Validators.required],
      PAddress2: ['', Validators.required],
      Pcity: ['', Validators.required],
      Pstate: ['', Validators.required],
      PzipCode: ['', Validators.required],
      IsDocumentSubmitted: [],
      dateOfBirth: ['', Validators.required],
      bloodgroup: ['', Validators.required],
      ContactNo: ['', [Validators.required, this.phoneNumberValidator]],
      // ContactNo:['',Validators.required],
      EmergencyContactNo: ['', [Validators.required, this.phoneNumberValidator]],
      Email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      payingFeesNow: ['', Validators.required]
      // PAddress1:['',Validators.required],
      // PCity:['',Validators.required],

    });




    this.registerStudentCourse = this.formBuilder.group({
      StudentID: ['', Validators.required],
      CourseType: ['', Validators.required],
      CourseName: ['', Validators.required],
      CourseFees: ['', Validators.required],
      // Fees:['',Validators.required],
      FeesAmount: ['', Validators.required],
      AnyDiscount: ['', Validators.required],
      NewDiscountedAmount: ['', Validators.required],
      DateofPayment: ['', Validators.required],
      FeesTakenBy: ['', Validators.required],
      Remark: ['', Validators.required]
    },
    );

    // this.registerStudentCourse=this.formBuilder.group({
    //   StudentID:[''],
    //   CourseType:[''],
    //   CourseName:[''],
    //   CourseFees:[''],
    //   Fees:[''],
    //   FeesAmount:[''],
    //   AnyDiscount:[''],
    //   NewDiscountedAmount:[''],
    //   DateofPayment:[''],
    //   FeesTakenBy:[''],
    //   Remark:['']
    // },
    // );



    this.registerStudentLogin = this.formBuilder.group({
      FirstName: ['', Validators.required],
      Lastname: ['', Validators.required],
      EMailId: ['', Validators.required],
      Role: ['', Validators.required],
      Password: ['', Validators.required],
      VerifyPassword: ['', Validators.required],
      CreatedBy: ['', Validators.required]
      //StudentID:['',Validators.required]
    },

    )

    // this.registerStudentLogin=this.formBuilder.group({
    //   FirstName:['',Validators.required],
    //   Lastname:['',Validators.required],
    //   EMailId:['',Validators.required],
    //   Role:['',Validators.required],
    //   CreatedBy:['',Validators.required],
    //   Password:['',Validators.required],
    //   VerifyPassword:['',[Validators.required,this.matchValidator]]
    //   //StudentID:['',Validators.required]
    //   // passwords:this.formBuilder.group({
    //   //   Password:['',Validators.required],
    //   //   VerifyPassword:['',Validators.required]
    //   // },{validator:this.matchValidator})
    // }, 

    // )



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

  // onSubmit() {
  //   debugger;
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.registerForm.invalid) {
  //     return;
  //   }

  //   this.modalService.show(this.openModal)

  //   // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))


  // }



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


  // MatchPassword(AC: AbstractControl){
  //    debugger;
  //   let password=this.registerStudentLogin.controls.Password.value;
  //   let verifyPassword=this.registerStudentLogin.controls.VerifyPassword.value;

  //   if(password!=verifyPassword){
  //     AC.get('verifyPassword').setErrors({MatchPassword:true})
  //   }
  //   else{
  //     return null;
  //   }

  // }


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

      IsDocumentSubmitted: this.registerForm.controls.IsDocumentSubmitted.value,
      PayingFees: this.registerForm.controls.payingFeesNow.value
    };


    this.CreateNewStudentService.CreateNewStudent(body).subscribe(data =>
      // do something, if upload success
      this.CreateNewStudentService.GetRecentlyCreatedStudent()
    );



    //this.CreateNewStudentService.GetRecentlyCreatedStudent();


    //Open Popup function
    if(this.registerForm.controls.payingFeesNow.value){
      this.modalRef = this.modalService.show(template);
      this.CreateNewStudentService.GetAllCourseType();
     // this.CreateNewStudentService.GetCourseNameFromCourseType(this.selectedUserValue);
      this.CreateNewStudentService.GetUsersListForFeesTaken();
    }
  }



  openModal2(template: TemplateRef<any>) {
    debugger;

    this.submitStudentFees = true;
    if (this.registerStudentCourse.invalid) {
      return
    }

    this.modalRef = this.modalService.show(template);
    this.CreateNewStudentService.GetRolesListForDropDown();
  }


  get f() { return this.registerForm.controls; }

  get g() { return this.registerStudentCourse.controls; }

  get e() { return this.registerStudentLogin.controls }

  //   onSubmit() {
  //     this.submitted = true;

  //     // stop here if form is invalid
  //     if (this.registerForm.invalid) {
  //         return;
  //     }

  //     // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  // }

  // onSubmitStudentCourse() {
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.registerStudentCourse.invalid) {
  //       return;
  //   }

  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerStudentCourse.value))
  //}

  onSubmitStudentLogin() {
    debugger;
    this.submitStudentLogin = true;

    //stop here if form is invalid
    if (this.registerStudentLogin.invalid) {
      return;
    }
    // alert('Success!! \n\n' + JSON.stringify(this.registerStudentLogin.value))
  }



  phoneNumberValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const valid = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(control.value)
    return valid
      ? null
      : { invalidNumber: { valid: false, value: control.value } }
  }

  ShowUpload() {

    this.showSelected = true;
  }

  HideUpload() {
    this.showSelected = false;
  }


  CreateNewStudent(student: CreateStudent) {
    debugger;
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

      IsDocumentSubmitted: true,
      PayingFees: this.registerForm.controls.payingFeesNow.value
    };


    // // this.CreateNewStudentService.CreateNewStudent(body).subscribe(data=>{
    // //   this.CreateNewStudentService.GetRecentlyCreatedStudent();
    // }

    // );

    // this.CreateNewStudentService.GetRecentlyCreatedStudent();
  }



  CreateStudentCourse(feesTransaction: FeesTransaction) {
    debugger;
    this.submitStudentFees = true;
    if (this.registerStudentCourse.invalid) {
      return
    }

    // this.CreateNewStudentService.GetRecentlyCreatedStudent()
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
      CourseCompleted: false,
      Discount: this.registerStudentCourse.controls.AnyDiscount.value,
      TotalFees: this.registerStudentCourse.controls.NewDiscountedAmount.value,
      Remark: this.registerStudentCourse.controls.Remark.value,
      IsActive: true

    };

    if (confirm("Do you want to submit?")) {
      this.CreateNewStudentService.CreateStudentCourse(body).subscribe();
      this.CreateNewStudentService.GetRecentlyCreatedStudent();
    }
  }

  CreateStudentLogin(user: User) {
    debugger;

    this.submitStudentLogin = true;
    if (this.registerStudentLogin.invalid) {
      return
    }

    let body: User = {
      Id: 0,
      //StudentId:this.registerStudentLogin.controls.StudentID.value,
      FirstName: this.selectedStudentFirstName,
      LastName: this.selectedStudentLastName,
      Email: this.selectedStudentEmail,
      Password: this.registerStudentLogin.controls.VerifyPassword.value,
      RoleId: this.selectedRoleValue,
      CreatedBy: this.registerStudentLogin.controls.CreatedBy.value

    };

    if(this.registerStudentLogin.controls.Password.value!=this.registerStudentLogin.controls.VerifyPassword.value)
    {
      alert("Password did not matched..Please verify password")
    }
    else
    {
    if (confirm("Are you sure to create a login?")) {
      this.CreateNewStudentService.CreateStudentLogin(body).subscribe((data) => {
        //this.router.navigate(['/StudentList']);
      });
    }
  }
}

  // GetAllCourseType(){
  //   debugger;
  //   this.CreateNewStudentService.GetAllCourseType().subscribe(data=>this.listCourseType=data)
  // }

  handleFileInput(files: FileList) {
    debugger;
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    debugger;
    this.CreateNewStudentService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
    }, error => {
      console.log(error);
    });
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

  GetCourseNameFromCourseType(courses: Courses) {
    debugger;
    //  let body= {
    //   CourseId:this.selectedUserValue
    //   }
    this.CreateNewStudentService.GetCourseNameFromCourseType(this.selectedUserValue)

  }

  GetCourseFeesFromCourseName(courses: Courses) {
    debugger;

    this.CreateNewStudentService.GetCourseFeesFromCourseName(this.selectedFeesValue)

  }

  CalculateDiscountedAmount() {
    debugger;
    this.CalculatedDiscountedAmount = ((this.registerStudentCourse.controls.CourseFees.value) - ((this.registerStudentCourse.controls.AnyDiscount.value / 100) * this.registerStudentCourse.controls.CourseFees.value))
    this.registerStudentCourse.controls.NewDiscountedAmount.setValue(this.CalculatedDiscountedAmount)

  }

}
