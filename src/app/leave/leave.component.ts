import { Course } from './../Model/CourseType';
import { CoursesService } from './../courses/courses.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LeaveService } from './leave.service';
import { validateConfig } from '@angular/router/src/config';
import { LeaveTransaction, LeaveType } from '../models/LeaveTran';
import { UpdateLeaves, Leaves } from '../Models/leaves';
import { CourseType, Students } from '../Models/Students';
import { Subject } from 'rxjs';
import { Utils } from '../Utils';
//import { createEnquiry } from '../models/createEnquiry';
//import { leave } from '@angular/core/src/profile/wtf_impl';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  submitted = false;
  modalRef: any;
  leaveTran: LeaveTransaction[];
  Courses: Course[];
  students: Students[];
  leaves: LeaveType[];
  CreateLeaveFormGroup: FormGroup;
  UpdateLeaveFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
     private modalService: BsModalService, 
     private LeaveService: LeaveService,
     private coursesService:CoursesService) { }

  ngOnInit() {
    this.dtOptions = {
      //retrieve: true,
      //paging: false,
      pagingType: 'full_numbers',
      pageLength: 5

    };
    this.CreateLeaveFormGroup = this.formBuilder.group({
      CourseName: [],
      Reason: ['', Validators.required],
      Comment: [],
      NeedFollowupDate: ['', Validators.required],
      FromDate: ['', Validators.required],
      ToDate: ['', Validators.required],
      StudentName: ['', Validators.required],
      LeaveName: []
    });

    this.UpdateLeaveFormGroup = this.formBuilder.group({
      CourseName: [],
      Reason: ['', Validators.required],
      Comment: [],
      NeedFollowupDate: ['', Validators.required],
      FromDate: ['', Validators.required],
      ToDate: ['', Validators.required],
      Totaldays: ['', Validators.required],
      StudentName: ['', Validators.required],
      LeaveName: []
    });

    this.getLeaveList();
    this.getCourseName();
    this.getCourseNameByType();
  }

  // convenience getter for easy access to form fields
  get fc() { return this.CreateLeaveFormGroup.controls; }
  get fu() { return this.UpdateLeaveFormGroup.controls; }


  getLeaveList() {
    this.LeaveService.getLeave().subscribe(res => {
      this.leaveTran = res
    this.dtTrigger.next()
    });
    console.log(JSON.stringify(this.leaveTran));
  }

  CreateNewLeave() {
    debugger;
    console.log(this.fc);
    this.submitted = true;
    // stop here if form is invalid
    if (this.CreateLeaveFormGroup.invalid) {
      return;
    }
   // debugger;
    let req = {
      LeaveType: this.fc.LeaveName.value,
      Course: this.fc.CourseName.value,
      FromDate: this.fc.FromDate.value,
      ToDate: this.fc.ToDate.value,
      Reason: this.fc.Reason.value,
      NeedFollowupDate: this.fc.NeedFollowupDate.value,
      Comment: this.fc.Comment.value,
      FullName: null,
      StudentId: this.fc.StudentName.value,
      CourseId: this.fc.CourseName.value,
      Id: 0,
    }
    this.LeaveService.CreateLeave(req).subscribe(res => {
      this.modalRef.hide()
      
      this.getLeaveList();
      console.log(JSON.stringify(res));
    });

  }

  public user = Utils.GetCurrentUser();

  getCourseName() {
    
    this.coursesService.courseList(this.user.InstituteId, this.user.BranchId).subscribe(res => {
      this.Courses = res;
      console.log(JSON.stringify(this.Courses));
    });
  }

  getStudentName(event) {
    debugger;
    this.LeaveService.GetStudentName(event.target.value).subscribe(res => {
      this.students = res;
      console.log(JSON.stringify(this.students));
    })
  }

  getCourseNameByType() {
    //debugger;
    this.LeaveService.GetCourseNameByType().subscribe(res => {
      this.leaves = res;
      console.log(JSON.stringify(this.leaves));
    });
  }


  OpenCreateModal(createTemplate: TemplateRef<any>) {
  
    this.modalRef = this.modalService.show(createTemplate,{
      backdrop: 'static',
      class:'modal-xl'
    });
    
  }

  // <!-- Edit leave modal -->
  UpdateCreateModal(EditTemplate: TemplateRef<any>, editItem: LeaveTransaction) {
    this.modalRef = this.modalService.show(EditTemplate,{
        backdrop: 'static',
        class:'modal-xl'
      });
    

    debugger;
    this.UpdateLeaveFormGroup.patchValue({
      LeaveId: editItem.Id,
      CourseId: editItem.CourseId,
      StudentId: editItem.StudentId,
      FullName: editItem.FullName,
      Reason: editItem.Reason,
      Comment: editItem.Comment,
      NeedFollowupDate: editItem.NeedFollowupDate,
      FromDate: editItem.FromDate,
      ToDate: editItem.ToDate,
      //Courses:editItem.Courses,
      //StudentName: editItem.StudentName,
      LeaveType: editItem.LeaveType
    })
    //this.modalRef = this.modalService.show(EditTemplate);
  }

  UpdateLeave() {
    //debugger;
    console.log(this.fu);
    this.submitted = true;
    if (this.UpdateLeaveFormGroup.invalid) {
      return
    }
    let req = {
      Id: 0,
      LeaveType: this.UpdateLeaveFormGroup.controls.LeaveType.value,
      Course: this.UpdateLeaveFormGroup.controls.LeaveType.value,
      FromDate: this.UpdateLeaveFormGroup.controls.FromDate.value,
      ToDate: this.UpdateLeaveFormGroup.controls.ToDate.value,
      Reason: this.UpdateLeaveFormGroup.controls.Reason.value,
      NeedFollowupDate: this.UpdateLeaveFormGroup.controls.NeedFollowupDate.value,
      Comment: this.UpdateLeaveFormGroup.controls.Reason.value,
      FullName: null,
      StudentId: this.UpdateLeaveFormGroup.controls.StudentId.value,
      CourseId: this.UpdateLeaveFormGroup.controls.StudentId.value
    }
    if (confirm("Do you want to Save Changes?")) {
      this.LeaveService.EditLeave(req).subscribe(data => { this.getLeaveList(), this.modalRef.hide() })
    }
  }
}
