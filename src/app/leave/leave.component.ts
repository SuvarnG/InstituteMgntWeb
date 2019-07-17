import { LeaveType, LeaveTransaction } from './../Models/LeaveTran';
import { Course } from './../Model/CourseType';
import { CoursesService } from './../courses/courses.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LeaveService } from './leave.service';
import { validateConfig } from '@angular/router/src/config';
import { UpdateLeaves, Leaves } from '../Models/leaves';
import { CourseType, Students } from '../Models/Students';
import { Subject } from 'rxjs';
import { Utils } from '../Utils';
import { formatDate } from '@angular/common';

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
  Days: number;
  StudentId: number;
  CourseId: number;
  LeaveTransactionId: number;

  constructor(private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private LeaveService: LeaveService,
    private coursesService: CoursesService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10

    };
    this.CreateLeaveFormGroup = this.formBuilder.group({
      CourseName: [],
      Reason: ['', Validators.required],
      Comment: [],
      NeedFollowupDate: ['', Validators.required],
      FromDate: ['', Validators.required],
      ToDate: ['', Validators.required],
      StudentName: ['', Validators.required],
      LeaveName: [],
      TotalDays: []
    });

    this.UpdateLeaveFormGroup = this.formBuilder.group({
      CourseName: [],
      Reason: ['', Validators.required],
      Comment: [],
      NeedFollowupDate: ['', Validators.required],
      FromDate: ['', Validators.required],
      ToDate: ['', Validators.required],
      StudentName: [''],
      LeaveName: [],
      TotalDays: []
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

  createNewLeave() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.CreateLeaveFormGroup.invalid) {
      return;
    }
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
      TotalDays: this.fc.TotalDays.value
    }
    this.LeaveService.createLeave(req).subscribe(res => {
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
    this.LeaveService.getStudentName(event.target.value).subscribe(res => {
      this.students = res;
      console.log(JSON.stringify(this.students));
    })
  }

  getCourseNameByType() {
    this.LeaveService.getCourseNameByType().subscribe(res => {
      this.leaves = res;
      console.log(JSON.stringify(this.leaves));
    });
  }


  OpenCreateModal(createTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(createTemplate, {
      backdrop: 'static',
      class: 'modal-xl'
    });

  }

  // <!-- Edit leave modal -->
  updateCreateModal(EditTemplate: TemplateRef<any>, editItem) {
    this.getCourseName();
    this.getStudentName;
    this.StudentId = editItem.StudentId;
    this.CourseId = editItem.CourseId;
    this.LeaveTransactionId = editItem.Id;
    this.UpdateLeaveFormGroup.patchValue({
      CourseName: editItem.FullName,
      LeaveId: editItem.Id,
      CourseId: editItem.CourseId,
      StudentId: editItem.StudentId,
      StudentName: editItem.FirstName + ' ' + editItem.LastName,
      Reason: editItem.Reason,
      Comment: editItem.Comment,
      NeedFollowupDate: formatDate(editItem.NeedFollowupDate, 'yyyy-MM-dd', 'en'),
      FromDate: formatDate(editItem.FromDate, 'yyyy-MM-dd', 'en'),
      ToDate: formatDate(editItem.ToDate, 'yyyy-MM-dd', 'en'),
      LeaveName: editItem.LeaveId,
      TotalDays: editItem.TotalDays
    })
    this.modalRef = this.modalService.show(EditTemplate, {
      backdrop: 'static',
      class: 'modal-xl'
    });
  }

  updateLeave() {
    this.submitted = true;
    if (this.UpdateLeaveFormGroup.invalid) {
      return
    }
    let req = {
      Id: this.LeaveTransactionId,
      LeaveType: this.UpdateLeaveFormGroup.controls.LeaveName.value,
      FromDate: this.UpdateLeaveFormGroup.controls.FromDate.value,
      ToDate: this.UpdateLeaveFormGroup.controls.ToDate.value,
      Reason: this.UpdateLeaveFormGroup.controls.Reason.value,
      NeedFollowupDate: this.UpdateLeaveFormGroup.controls.NeedFollowupDate.value,
      Comment: this.UpdateLeaveFormGroup.controls.Reason.value,
      FullName: null,
      StudentId: this.StudentId,
      CourseId: this.CourseId,
      TotalDays: this.UpdateLeaveFormGroup.controls.TotalDays.value
    }
    if (confirm("Do you want to Save Changes?")) {
      this.LeaveService.editLeave(req).subscribe(data => { this.getLeaveList(), this.modalRef.hide() })
    }
  }

  calculateTotaldays(d1, d2) {
    var diff = Date.parse(d1) - Date.parse(d2);
    this.Days = Math.floor(diff / (1000 * 60 * 60 * 24));
    this.CreateLeaveFormGroup.controls.TotalDays.setValue(this.Days);
  }
}
