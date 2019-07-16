import { Course } from './../Model/CourseType';
import { Utils } from './../Utils';
import { CoursesService } from './../courses/courses.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FeesTransactionService } from './fees-transaction.service';
import { Students, CreateStudent, FeesTransactions, FeesTransaction, User, CourseType, Courses, Users, Roles, RecentStudent, CourseFees } from '../Models/Students';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap';


@Component({
  selector: 'app-fees-transaction',
  templateUrl: './fees-transaction.component.html',
  styleUrls: ['./fees-transaction.component.css']
})

export class FeesTransactionComponent implements OnInit {
  selectedUserValue: number;
  selectedFeesValue: number;
  selectedStudentId: number;
  remainingFees: number;
  registerFeesTransaction: FormGroup;
  submitFeesTransaction: boolean;
  modalRef: BsModalRef
  studentList: Students[];
  courseFees: CourseFees[];
  feesTransaction: FeesTransactions[];
  users: Users[];
  studentId: number;
  courseList: Course[];
  showFeesTable=false;

  constructor(public FeesTransactionService: FeesTransactionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: BsModalService,
    private coursesService: CoursesService) { }

  ngOnInit() {
    this.coursesService.courseList(this.user.InstituteId, this.user.BranchId).subscribe(res => {
      this.courseList = res
    });
    this.getUsersListForFeesTaken();

    this.registerFeesTransaction = this.formBuilder.group({
      CourseName: ['', Validators.required],
      CourseFees: ['', Validators.required],
      StudentID: ['', Validators.required],
      FeesAmount: ['', Validators.required],
      RemainingFees: []
    })

  }
  public user = Utils.GetCurrentUser();
  get g() { return this.registerFeesTransaction.controls; }

  selectUser(event) {
    this.selectedUserValue = event.target.value;
  }

  selectFees(event) {    
    this.selectedFeesValue = event.target.value;
    this.courseFees=null;
    this.feesTransaction=null;
    //this.remainingFees=0;
    this.showFeesTable=false;
    if(this.registerFeesTransaction.controls.RemainingFees.value){
      this.registerFeesTransaction.controls.RemainingFees.reset();
    }
  }

  selectStudent(event) {
    this.selectedStudentId = event.target.value;
    this.showFeesTable=true;
  }

  getUsersListForFeesTaken() {
    this.FeesTransactionService.getUsersListForFeesTaken().subscribe(res => {
      this.users = res
    })
  }

  getStudentListFromCourseName() {
    this.FeesTransactionService.getStudentListFromCourseName(this.selectedFeesValue).subscribe(res => {
      this.studentList = res
    })
  }

  getTotalFeesForStudentCourse() {
    this.FeesTransactionService.getTotalFeesForStudentCourse(this.selectedStudentId).subscribe(res => {
      this.courseFees = res
    })
  }

  getFeesTransactionDetails() {
    this.FeesTransactionService.getFeesTransactionDetails(this.selectedStudentId).subscribe(res => {
      this.feesTransaction = res
    })
  }

  createStudentCourse() {
    this.submitFeesTransaction = true;
    if (this.registerFeesTransaction.invalid) {
      return      
    }

    this.studentId = this.registerFeesTransaction.controls.StudentID.value;

    let body: FeesTransactions = {
      Id: 0,
      CourseId: this.registerFeesTransaction.controls.CourseName.value,
      StudentId: this.registerFeesTransaction.controls.StudentID.value,
      DateOfPayment: new Date(),
      FeesPaid: this.registerFeesTransaction.controls.FeesAmount.value,
      FeesTakenBy: this.user.userId.toString(),
      PendingFees: Number(this.registerFeesTransaction.controls.RemainingFees.value) - Number(this.registerFeesTransaction.controls.FeesAmount.value)
    }

    if (confirm("Do you want to submit?")) {
      this.FeesTransactionService.createStudentCourse(body).subscribe(data => {
        this.router.navigateByUrl('/FeesTransaction');
        this.FeesTransactionService.getFeesTransactionDetails(this.studentId).subscribe(res => {
          this.feesTransaction = res
        })
      });
    };
  }

  calculateTotalPaidFees(fees: number) {
    this.registerFeesTransaction.controls.TotalPaidAmount.setValue(fees + this.registerFeesTransaction.controls.FeesAmount.value)
  }

  calculateRemainingFees() {
    let sum = 0;
    for (var i = 0; i < this.feesTransaction.length; i++) {
      console.log(this.feesTransaction[i]['FeesPaid']);
      sum += this.feesTransaction[i]['FeesPaid'];
    }

    console.log(sum)

    this.remainingFees = (this.registerFeesTransaction.controls.CourseFees.value - sum)

    console.log(this.remainingFees)

    this.registerFeesTransaction.controls.RemainingFees.setValue(this.remainingFees)
  }

  clearFeesTransaction(){
    this.submitFeesTransaction=false;
    this.feesTransaction=null;
    this.showFeesTable=false;
    this.registerFeesTransaction.reset();

  }

}
