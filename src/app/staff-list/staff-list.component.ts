import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StaffListService } from './staff-list.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StaffMaster } from '../Model/StaffMaster';
import { Router, ActivatedRoute } from '@angular/router';
import { validateConfig } from '@angular/router/src/config';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  returnUrl: string;
  public staffMaster: StaffMaster[];
  staffForm: FormGroup;
  modalRef: BsModalRef;
  TeacherId: Number;
  errorMessage: any;
  selectedCourseTypeValue: number;
  selectedCourseName: string;
  submitted = false;

  constructor(private datePipe: DatePipe, private StaffListService: StaffListService,
    private modalService: BsModalService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = '/teacher-courses';

    this.staffForm = this.fb.group({
      Gender: ['', Validators.required],
      CourseType: ['', Validators.required],
      ContactNo: ['', Validators.required],
      Email: ['', Validators.required],
      PreviousExperience: ['', Validators.required],
      DateOfLeaving: ['', Validators.required],
      Courses: ['', Validators.required],
      LeavingReason: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      MiddleName: ['', Validators.required],
      DOB: ['', Validators.required],
      Photo: ['', Validators.required],
      Address1: ['', Validators.required],
      Address2: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      STDCode: ['', Validators.required],
      P_Address1: ['', Validators.required],
      P_Address2: ['', Validators.required],
      P_City: ['', Validators.required],
      P_State: ['', Validators.required],
      P_STDCode: ['', Validators.required],
      P_ContactNo: ['', Validators.required],
      EmergencyNo: ['', Validators.required],
      PreviousWorkName: ['', Validators.required],
      BloodGroup: ['', Validators.required]
    });

    this.getAllTeacher();
  }
  AddNewStaff() {
    // this.router.navigate([this.returnUrl]);
  }
  getAllTeacher() {
    debugger;
    this.StaffListService.getAllTeachers().subscribe(res => this.staffMaster = res);
  }

  get f() {
    return this.staffForm.controls;
  }

  onSubmitEditStaff() {
    debugger;
    console.log(this.staffForm);
    if (this.staffForm.invalid == true) {
      this.submitted = true;
      return;
    }
    else {
      this.submitted = false;

      let body = {
        Gender: this.staffForm.controls.Gender.value,
        CourseType: this.staffForm.controls.CourseType.value,
        ContactNo: this.staffForm.controls.ContactNo.value,
        Email: this.staffForm.controls.Email.value,
        StaffId: this.TeacherId,
        PreviousExperience: this.staffForm.controls.PreviousExperience.value,
        Courses: this.staffForm.controls.Courses.value,
        DateOfLeaving: this.staffForm.controls.DateOfLeaving.value,
        LeavingReason: this.staffForm.controls.LeavingReason.value,
        FirstName: this.staffForm.controls.FirstName.value,
        MiddleName: this.staffForm.controls.MiddleName.value,
        LastName: this.staffForm.controls.LastName.value,
        DOB: this.staffForm.controls.DOB.value,
        Photo: this.staffForm.controls.Photo.value,
        Address1: this.staffForm.controls.Address1.value,
        Address2: this.staffForm.controls.Address2.value,
        City: this.staffForm.controls.City.value,
        State: this.staffForm.controls.State.value,
        STDCode: this.staffForm.controls.STDCode.value,
        P_Address1: this.staffForm.controls.P_Address1.value,
        P_Address2: this.staffForm.controls.P_Address2.value,
        P_City: this.staffForm.controls.P_City.value,
        P_State: this.staffForm.controls.P_State.value,
        P_STDCode: this.staffForm.controls.P_STDCode.value,
        P_ContactNo: this.staffForm.controls.P_ContactNo.value,
        EmergencyNo: this.staffForm.controls.EmergencyNo.value,
        PreviousWorkName: this.staffForm.controls.PreviousWorkName.value,
        BloodGroup: this.staffForm.controls.BloodGroup.value
      }
      this.StaffListService.updateStaff(body)
        .subscribe((data) => {
          this.modalRef.hide();
          alert("Staff updated successfully");
          this.getAllTeacher();
          this.router.navigate(['/StaffList']);
        }, error => this.errorMessage = error)
    }
  }
  // Update(){
  //   debugger;
  // if (this.staffForm.invalid==true)
  //  {
  //       this.submitted = true;
  //       return;
  //      }
  //      else
  //      {
  //       this.submitted = false;

  //   let body ={
  //     Gender:this.staffForm.controls.Gender.value,
  //     Name:this.staffForm.controls.Name.value,
  //     CourseType: this.staffForm.controls.CourseType.value,
  //     ContactNo: this.staffForm.controls.ContactNo.value,
  //     Email:this.staffForm.controls.Email.value,
  //     StaffId:this.TeacherId,
  //     PreviousExperience:this.staffForm.controls.PreviousExperience.value,
  //     Courses:this.staffForm.controls.Courses.value,
  //     DateOfLeaving:this.staffForm.controls.DateOfLeaving.value,
  //     LeavingReason:this.staffForm.controls.LeavingReason.value,
  //     FirstName:this.staffForm.controls.FirstName.value,
  //     MiddleName:this.staffForm.controls.MiddleName.value,
  //     LastName:this.staffForm.controls.LastName.value,
  //     DOB:this.staffForm.controls.DOB.value,
  //     Photo:this.staffForm.controls.Photo.value,
  //     Address1:this.staffForm.controls.Address1.value,
  //     Address2:this.staffForm.controls.Address2.value,
  //     City:this.staffForm.controls.City.value,
  //     State:this.staffForm.controls.State.value,
  //     STDCode:this.staffForm.controls.STDCode.value,
  //     P_Address1:this.staffForm.controls.P_Address1.value,
  //     P_Address2:this.staffForm.controls.P_Address2.value,
  //     P_City:this.staffForm.controls.P_City.value,
  //     P_State:this.staffForm.controls.P_State.value,	
  //     P_STDCode:this.staffForm.controls.P_STDCode.value,
  //     P_ContactNo:this.staffForm.controls.P_ContactNo.value,
  //     EmergencyNo:this.staffForm.controls.EmergencyNo.value,
  //     PreviousWorkName:this.staffForm.controls.PreviousWorkName.value,
  //     IsCv:this.staffForm.controls.IsCv.value,
  //     IsFixedPayment:this.staffForm.controls.IsFixedPayment.value,
  //     BloodGroup:this.staffForm.controls.BloodGroup.value
  //   }
  //   this.StaffListService.updateStaff(body)  
  //   .subscribe((data) => { 
  //     this.modalRef.hide();
  //       this.getAllTeacher(); 
  //       this.router.navigate(['/StaffList']);  
  //   }, error => this.errorMessage = error)
  // }
  // }


  Edit(editStaff: TemplateRef<any>, teacher) {
    debugger;
    this.TeacherId = teacher.StaffId;
    let body = {
      Gender: teacher.Gender,
      StaffId: teacher.StaffId,
      FirstName: teacher.FirstName,
      MiddleName: teacher.MiddleName,
      LastName: teacher.LastName,
      DOB: this.datePipe.transform(teacher.DOB, "MM/dd/yyyy"),
      BloodGroup: teacher.BloodGroup,
      Email: teacher.Email,
      ContactNo: teacher.ContactNo,
      EmergencyNo: teacher.EmergencyNo,
      CourseType: teacher.CourseType,
      Courses: teacher.Courses,
      PreviousWorkName: teacher.PreviousWorkName,
      PreviousExperience: teacher.PreviousExperience,
      DateOfLeaving: this.datePipe.transform(teacher.DateOfLeaving, "MM/dd/yyyy"),
      LeavingReason: teacher.LeavingReason,
      Photo: teacher.Photo,
      Address1: teacher.Address1,
      Address2: teacher.Address2,
      City: teacher.City,
      State: teacher.State,
      STDCode: teacher.STDCode,
      P_Address1: teacher.P_Address1,
      P_Address2: teacher.P_Address2,
      P_City: teacher.P_City,
      P_State: teacher.P_State,
      P_STDCode: teacher.P_STDCode,
      P_ContactNo: teacher.P_ContactNo,
      //IsCv:teacher.IsCv,
      //sFixedPayment:teacher.IsFixedPayment,
    }
    console.log(teacher.DateOfLeaving);
    this.staffForm.patchValue(body);
    this.modalRef = this.modalService.show(editStaff, {
      animated: true,
      backdrop: 'static'
    });
    this.StaffListService.GetAllCourseType();
    if (teacher.CourseType != null) {
      this.StaffListService.GetCourseName(Number(teacher.CourseType));
    }
  }

  Delete(staffID) {
    var ans = confirm("Do you want to delete customer with Id: " + staffID);
    if (ans) {
      this.StaffListService.deleteStaff(staffID).subscribe(data => {
        alert("Staff deleted successfully");
        this.getAllTeacher();
      }, error => console.error(error))
    }
  }

  selectCourse(event) {
    debugger;
    this.selectedCourseTypeValue = event.target.value;
    this.StaffListService.GetCourseName(this.selectedCourseTypeValue);
  }
  selectCourseName(event) {
    this.selectedCourseName = event.target.value;
  }

  GetCourses(showCourses: TemplateRef<any>, id: number) {
    debugger;
    this.StaffListService.GetTeacherCourses(id);
    this.modalRef = this.modalService.show(showCourses, {
      animated: true,
      backdrop: 'static'
    });
  }
}
