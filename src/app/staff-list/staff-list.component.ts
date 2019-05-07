import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StaffListService } from './staff-list.service';
import {  NgForm, FormBuilder, FormGroup, Validators, FormControl   } from '@angular/forms';
import { StaffMaster } from '../Model/StaffMaster';
import { Router, ActivatedRoute } from '@angular/router';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  returnUrl:string;
  public teacher:StaffMaster[];
  staffForm:FormGroup;
  modalRef: BsModalRef;
  TeacherId:Number;
  errorMessage: any;
  constructor(private StaffListService:StaffListService,
    private modalService: BsModalService,private fb:FormBuilder,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl ='/teacher-courses';

    this.staffForm = this.fb.group({
      Name: ['', Validators.required],
      CourseType: ['', Validators.required],
      DateOfJoining: ['', Validators.required],
      ContactNo:['', Validators.required],
      Email:['', Validators.required],
      PreviousExperience:['', Validators.required],
      DateOfLeaving:['', Validators.required],
      Courses:['',Validators.required],
      LeavingReason:['',Validators.required],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      middleName:['',Validators.required]
  });

    this.getAllTeacher();
  }
  AddNewStaff(){
    // this.router.navigate([this.returnUrl]);
  }
getAllTeacher(){
  debugger;
  this.StaffListService.getAllTeachers().subscribe(res=>this.StaffMaster=res);
}

Update(){
  debugger;
  let body ={
    Name:this.staffForm.controls.Name.value,
    CourseType: this.staffForm.controls.CourseType.value,
    DateOfJoining: this.staffForm.controls.DateOfJoining.value,
    ContactNo: this.staffForm.controls.ContactNo.value,
    Email:this.staffForm.controls.Email.value,
    StaffId:this.TeacherId,
    PreviousExperience:this.staffForm.controls.PreviousExperience.value,
    Courses:this.staffForm.controls.Courses.value,
    DateOfLeaving:this.staffForm.controls.DateOfLeaving.value,
    LeavingReason:this.staffForm.controls.LeavingReason.value,
    FirstName:this.staffForm.controls.firstName.value,
    MiddleName:this.staffForm.controls.middleName.value,
    LastName:this.staffForm.controls.lastName.value
  }
  this.StaffListService.updateStaff(body)  
  .subscribe((data) => {  
      this.router.navigate(['/StaffList']);  
  }, error => this.errorMessage = error)
}


Edit(editStaff: TemplateRef<any>,teacher){
  debugger;
  this.TeacherId=teacher.StaffId;
  let body ={
    StaffId:teacher.StaffId,
    FistName:teacher.FirstName,
    MiddleName:teacher.MiddleName,
    LastName:teacher.LastName,
    CourseType:teacher.CourseType,
    Courses:teacher.Courses,
    DateOfJoining:teacher.DateOfJoining,
    ContactNo:teacher.ContactNo,
    Email:teacher.Email,
    PreviousExperience:teacher.PreviousExperience,
    DateOfLeaving:teacher.DateOfLeaving,
    LeavingReason:teacher.LeavingReason,
    DOB:teacher.DOB,
    Photo:teacher.Photo,
    Address1:teacher.Address1,
    Address2:teacher.Address2,
    City:teacher.City,
    State:teacher.State,
    STDCode:teacher.STDCode,
    P_Address1:teacher.P_Address1,
    P_Address2:teacher.P_Address2,
    P_City:teacher.P_City,
    P_State:teacher.P_State,	
    P_STDCode:teacher.P_STDCode,
    P_ContactNo:teacher.P_ContactNo,
    EmergencyNo:teacher.EmergencyNo,
    PreviousWorkName:teacher.PreviousWorkName,
    IsCv:teacher.IsCv,
    IsFixedPayment:teacher.IsFixedPayment
  }
  this.staffForm.patchValue(body); 

  this.modalRef = this.modalService.show(editStaff);
}

Delete(staffID) {  
  var ans = confirm("Do you want to delete customer with Id: " + staffID);  
  if (ans) {  
      this.StaffListService.deleteStaff(staffID).subscribe(data => {  
          this.getAllTeacher();  
      }, error => console.error(error))  
  }  
}  

}
