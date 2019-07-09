import { CourseType, Course } from './../Model/CourseType';
import { CoursetypeService } from './../coursetype/coursetype.service';
import { CreateNewStudentService } from './../create-student/create-new-student.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StaffListService } from './staff-list.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaffMaster } from '../Model/StaffMaster';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Utils } from '../Utils';
import { Courses } from '../Models/Students';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  returnUrl: string;
  public staffMaster: StaffMaster[];
  staffForm: FormGroup;
  showStaffDetailsForm:FormGroup;
  modalRef: BsModalRef;
  teacherId: Number;
  errorMessage: any;
  selectedCourseTypeValue: number;
  selectedCourseName: string;
  submitted = false;
  filter:any;
  p:any;
  staffInfo:StaffMaster;
  courseTypeList:CourseType[];
  courseNameList:Courses[];

  constructor(private datePipe: DatePipe,
     private staffListService: StaffListService,
    private modalService: BsModalService, 
    private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute,
    private createNewStudentService:CreateNewStudentService,
    private coursetypeService:CoursetypeService) { }

  ngOnInit() {
    debugger;
    this.returnUrl = '/teacher-courses';
    this.staffForm = this.fb.group({
      Gender: ['', Validators.required],
      CourseType: ['', Validators.required],
      ContactNo: ['', Validators.required],
      Email: ['', Validators.required],
      PreviousExperience: ['', Validators.required],
      DateOfLeaving: ['', Validators.required],
      DOJ:['', Validators.required],
      Courses: ['', Validators.required],
      LeavingReason: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      MiddleName: ['', Validators.required],
      DOB: ['', Validators.required],
      Photo: ['', Validators.required],
      Address1: ['', Validators.required],
      Address2: [''],
      City: ['', Validators.required],
      State: ['', Validators.required],
      STDCode: ['', Validators.required],
      P_Address1: ['', Validators.required],
      P_Address2: [''],
      P_City: ['', Validators.required],
      P_State: ['', Validators.required],
      P_STDCode: ['', Validators.required],
      P_ContactNo: ['', Validators.required],
      EmergencyNo: ['', Validators.required],
      PreviousWorkName: ['', Validators.required],
      BloodGroup: ['', Validators.required]
    });

this.showStaffDetailsForm=this.fb.group({
      Gender: [],
      CourseType: [],
      ContactNo: [],
      Email: [],
      PreviousExperience: [],
      DateOfLeaving: [],
      Courses: [],
      LeavingReason: [],
      FirstName: [],
      LastName: [],
      MiddleName: [],
      DOB: [],
      DOJ:[],
      Photo: [],
      Address1: [],
      Address2: [],
      City: [],
      State: [],
      STDCode: [],
      P_Address1: [],
      P_Address2: [],
      P_City: [],
      P_State: [],
      P_STDCode: [],
      P_ContactNo: [],
      EmergencyNo: [],
      PreviousWorkName: [],
      BloodGroup: []
});
    this.getAllStaff(this.user.InstituteId,this.user.BranchId);
  }
  public user=Utils.GetCurrentUser();


  getAllStaff(InstituteId:number,BranchId:number) {
    InstituteId=this.user.InstituteId;
    BranchId=this.user.BranchId;
    this.staffListService.getAllStaff(InstituteId,BranchId).subscribe(res => this.staffMaster = res);
  }
  get f() {
    return this.staffForm.controls;
  }

  onSubmitEditStaff() {
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
        StaffId: this.teacherId,
        PreviousExperience: this.staffForm.controls.PreviousExperience.value,
        Courses: this.staffForm.controls.Courses.value,
        DateOfLeaving: this.staffForm.controls.DateOfLeaving.value,
        LeavingReason: this.staffForm.controls.LeavingReason.value,
        FirstName: this.staffForm.controls.FirstName.value,
        MiddleName: this.staffForm.controls.MiddleName.value,
        LastName: this.staffForm.controls.LastName.value,
        DOB:formatDate( this.staffForm.controls.DOB.value, 'yyyy-MM-dd', 'en'),
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
        BloodGroup: this.staffForm.controls.BloodGroup.value,
        DOJ:formatDate(this.staffForm.controls.DOJ.value, 'yyyy-MM-dd', 'en'),
        DOL:formatDate(this.staffForm.controls.DateOfLeaving.value, 'yyyy-MM-dd', 'en'),
      }
      this.staffListService.updateStaff(body)
        .subscribe((data) => {
          this.modalRef.hide();
          alert("Staff updated successfully");
          this.getAllStaff(this.user.InstituteId,this.user.BranchId);
          this.router.navigate(['/StaffList']);
        }, error => this.errorMessage = error)
    }
  }
  
  edit(editStaff: TemplateRef<any>, teacher) {
    this.teacherId = teacher.StaffId;
    let body = {
      Gender: teacher.Gender,
      StaffId: teacher.StaffId,
      FirstName: teacher.FirstName,
      MiddleName: teacher.MiddleName,
      LastName: teacher.LastName,
      DOB:formatDate(teacher.DOB, 'yyyy-MM-dd', 'en'),
      BloodGroup: teacher.BloodGroup,
      Email: teacher.Email,
      ContactNo: teacher.ContactNo,
      EmergencyNo: teacher.EmergencyNo,
      CourseType: teacher.CourseType,
      Courses: teacher.Courses,
      PreviousWorkName: teacher.PreviousWorkName,
      PreviousExperience: teacher.PreviousExperience,
      DateOfLeaving: formatDate(teacher.DateOfLeaving, 'yyyy-MM-dd', 'en'),
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
     DOJ:formatDate(teacher.DateOfJoining, 'yyyy-MM-dd', 'en'),
    }
    this.staffForm.patchValue(body);
    this.modalRef = this.modalService.show(editStaff, {
      animated: true,
      backdrop: 'static'
    });
    this.coursetypeService.courseTypeList().subscribe(res=>
      {
        this.courseTypeList=res
      });
    if (teacher.CourseType != null) {
      this.createNewStudentService.getCourseNameFromCourseType(Number(teacher.CourseType)).subscribe(res=>{
        this.courseNameList=res
      });
    }
  }

  delete(staffID,firstName,lastName) {
    var ans = confirm("Do you want to delete this staff: " + firstName + ' ' + lastName);
    if (ans) {
      this.staffListService.deleteStaff(staffID).subscribe(data => {
        //alert("Staff deleted successfully");
        this.getAllStaff(this.user.InstituteId,this.user.BranchId);
      }, error => console.error(error))
    }
  }

  selectCourse(event) {
    this.selectedCourseTypeValue = event.target.value;
    this.createNewStudentService.getCourseNameFromCourseType(this.selectedCourseTypeValue).subscribe(res=>{
      this.courseNameList=res
    });
  }
  selectCourseName(event) {
    this.selectedCourseName = event.target.value;
  }

  getStaffDetails(showStaff: TemplateRef<any>, teacher) {
   this.teacherId=teacher.StaffId;
   let body = {
    Gender: teacher.Gender,
    StaffId: teacher.StaffId,
    FirstName: teacher.FirstName,
    MiddleName: teacher.MiddleName,
    LastName: teacher.LastName,
    DOB: formatDate(teacher.DOB, 'yyyy-MM-dd', 'en'),
    BloodGroup: teacher.BloodGroup,
    Email: teacher.Email,
    ContactNo: teacher.ContactNo,
    EmergencyNo: teacher.EmergencyNo,
    CourseType: teacher.CourseType,
    Courses: teacher.Courses,
    PreviousWorkName: teacher.PreviousWorkName,
    PreviousExperience: teacher.PreviousExperience,
    DateOfLeaving: formatDate(teacher.DateOfLeaving, 'yyyy-MM-dd', 'en'),
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
    DOJ:formatDate(teacher.DateOfJoining, 'yyyy-MM-dd', 'en')
  }
  this.showStaffDetailsForm.patchValue(body);
   this.staffListService.getStaffDetails(this.teacherId).subscribe(res => this.staffInfo = res);
    this.modalRef = this.modalService.show(showStaff, {
      class: 'modal-xl',
      animated: true,
      backdrop: 'static'
    });
  }

  printPage(){
    window.print();
  }
}
