import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms'
import { CreateNewStudentService } from './create-new-student.service';

import { Students,CreateStudent,FeesTransaction,User, CourseType,Courses } from '../Models/Students';
import { jsonpCallbackContext } from '@angular/common/http/src/module';


@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  modalRef: BsModalRef;
  registerForm: FormGroup;
  submitted = false;
  showSelected:Boolean=false;
  registerStudentCourse:FormGroup;
  registerStudentLogin:FormGroup;
  selectedUserValue:number;
  selectedRoleValue:number;
  //public listCourseType: CourseType[];

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, 
              private CreateNewStudentService:CreateNewStudentService
          
             ) {}

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      Address1: ['', Validators.required],
      Address2:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      zipCode:['', Validators.required],
      PAddress1: ['', Validators.required],
      PAddress2:['',Validators.required],
      Pcity:['',Validators.required],
      Pstate:['',Validators.required],
      PzipCode:['', Validators.required],

      dateOfBirth:['',Validators.required],
      bloodgroup:['',Validators.required],
      ContactNo:['',[Validators.required,this.phoneNumberValidator]],
      // ContactNo:['',Validators.required],
      EmergencyContactNo:['',[Validators.required,this.phoneNumberValidator]],
      Email:['',[Validators.required,Validators.email]],
      gender:['',Validators.required],
      // PAddress1:['',Validators.required],
      // PCity:['',Validators.required],
      // PZipCode:['',Validators.required],
     
      

  }, 

      
  );
  this.registerStudentCourse=this.formBuilder.group({
    CourseType:['',Validators.required],
    CourseName:['',Validators.required],
    FeesAmount:['',Validators.required],
    AnyDiscount:['',Validators.required],
    NewDiscountedAmount:['',Validators.required],
    DateofPayment:['',Validators.required],
    FeesTakenBy:['',Validators.required]
  },
  );

  this.registerStudentLogin=this.formBuilder.group({
    FirstName:['',Validators.required],
    Lastname:['',Validators.required],
    EMailId:['',Validators.required],
    Role:['',Validators.required],
    Password:['',Validators.required],
    VerifyPassword:['',Validators.required]

  })

  }

  openModal(template: TemplateRef<any>) {
   debugger;
    this.modalRef = this.modalService.show(template);
    this.CreateNewStudentService.GetAllCourseType();
    this.CreateNewStudentService.GetCourseNameFromCourseType(this.selectedUserValue);
    this.CreateNewStudentService.GetUsersListForFeesTaken();
  }

  openModal2(template: TemplateRef<any>) {
    debugger;
     this.modalRef = this.modalService.show(template);
     this.CreateNewStudentService.GetRolesListForDropDown();
   }

  get f() { return this.registerForm.controls; }

  get g() {return this.registerStudentCourse.controls;}

  get e() {return this.registerStudentLogin.controls}

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
}

onSubmitStudentCourse() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.registerStudentCourse.invalid) {
      return;
  }

  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerStudentCourse.value))
}

onSubmitStudentLogin(){
  this.submitted=true;

  //stop here if form is invalid
  if(this.registerStudentLogin.invalid){
    return;
  }
  alert('Success!! \n\n' + JSON.stringify(this.registerStudentLogin.value))
}



 phoneNumberValidator(
  control: AbstractControl
      ): { [key: string]: any } | null {
      const valid = 	/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(control.value)
      return valid
      ? null
      : { invalidNumber: { valid: false, value: control.value } }
}

ShowUpload(){
 
  this.showSelected=true;
}

HideUpload(){
  this.showSelected=false;
}


CreateNewStudent(student:CreateStudent){
  debugger;
  let body: CreateStudent = {
    Gender:this.registerForm.controls.gender.value,
    FirstName: this.registerForm.controls.firstName.value,
    MiddleName: this.registerForm.controls.middleName.value,
    LastName: this.registerForm.controls.lastName.value,
    Address1:this.registerForm.controls.Address1.value,
    Address2:this.registerForm.controls.Address2.value,
    City:this.registerForm.controls.city.value,
    State:this.registerForm.controls.state.value,
    STDCode:this.registerForm.controls.zipCode.value,
    DOB:this.registerForm.controls.dateOfBirth.value,
    BloodGroup:this.registerForm.controls.bloodgroup.value,
    ContactNo:this.registerForm.controls.ContactNo.value,
    EmergencyNo:this.registerForm.controls.EmergencyContactNo.value,
    EmailId:this.registerForm.controls.Email.value,
   
    PAddress1:this.registerForm.controls.PAddress1.value,
    PAddress2:this.registerForm.controls.PAddress2.value,
    PCity:this.registerForm.controls.Pcity.value,
    PState:this.registerForm.controls.Pstate.value,
    PSTDCode:this.registerForm.controls.PzipCode.value,

    IsDocumentSubmitted:true,
    PayingFees:true
  };


  this.CreateNewStudentService.CreateNewStudent(body).subscribe()
}

CreateStudentCourse(feesTransaction:FeesTransaction){

  let body : FeesTransaction = {
    Id:0,
    CourseId:this.registerStudentCourse.controls.CourseName.value,
    StudentId:1,
    DateOfPayment:this.registerStudentCourse.controls.DateofPayment.value,
    FeesPaid:this.registerStudentCourse.controls.FeesAmount.value,
    FeesTakenBy:this.registerStudentCourse.controls.FeesTakenBy.value,
    // CourseCompleted:false,
    // Discount:this.registerStudentCourse.controls.Discount.value,
    // TotalFees:5000,
    // Remark:'remark',
    // IsActive:true

  };

      this.CreateNewStudentService.CreateStudentCourse(body).subscribe();

}

CreateStudentLogin(user:User){
  let body: User={
    Id:0,
    FirstName:this.registerStudentLogin.controls.FirstName.value,
    LastName:this.registerStudentLogin.controls.Lastname.value,
    Email:this.registerStudentLogin.controls.EMailId.value,
    Password:this.registerStudentLogin.controls.VerifyPassword.value,
    RoleId:this.selectedRoleValue,
    CreatedBy:1

   };

   this.CreateNewStudentService.CreateStudentLogin(body).subscribe();
}

// GetAllCourseType(){
//   debugger;
//   this.CreateNewStudentService.GetAllCourseType().subscribe(data=>this.listCourseType=data)
// }

selectUser(event)
 {
    debugger;
    this.selectedUserValue =  event.target.value;
 }

 selectRole(event){
   debugger;
   this.selectedRoleValue = event.target.value;
 }

 GetCourseNameFromCourseType(courses:Courses){
   debugger;
  //  let body= {
  //   CourseId:this.selectedUserValue
  //   }
    this.CreateNewStudentService.GetCourseNameFromCourseType(this.selectedUserValue)
    
 }

}
