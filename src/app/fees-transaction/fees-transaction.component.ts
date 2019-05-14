import { Component, OnInit } from '@angular/core';
import { FeesTransactionService } from './fees-transaction.service';
import { Students,CreateStudent,FeesTransactions, FeesTransaction,User,CourseType, Courses,Users,Roles,RecentStudent, CourseFees } from '../Models/Students';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-fees-transaction',
  templateUrl: './fees-transaction.component.html',
  styleUrls: ['./fees-transaction.component.css']
})
export class FeesTransactionComponent implements OnInit {
  selectedUserValue:number;
  selectedFeesValue:number;
  registerFeesTransaction:FormGroup;


  constructor(private FeesTransactionService:FeesTransactionService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    debugger;
    this.FeesTransactionService.GetAllCourseType();
    this.FeesTransactionService.GetUsersListForFeesTaken();

    this.registerFeesTransaction=this.formBuilder.group({
      CourseType:['',Validators.required],
      CourseName:['',Validators.required],
      CourseFees:['',Validators.required],
      StudentID:[],
      FeesAmount:['',Validators.required],
      DateofPayment:['',Validators.required],
      FeesTakenBy:['',Validators.required]
    })


    
  }

  get g() { return this.registerFeesTransaction.controls; }

  selectUser(event) {
    debugger;
    this.selectedUserValue = event.target.value;
  }

  selectFees(event) {
    debugger;
    this.selectedFeesValue = event.target.value;
  }

  GetCourseNameFromCourseType(courses: Courses) {
    debugger;
    this.FeesTransactionService.GetCourseNameFromCourseType(this.selectedUserValue)
  }

  GetStudentListFromCourseName(student:Students){
    debugger;
    this.FeesTransactionService.GetStudentListFromCourseName(this.selectedFeesValue)
  }

  GetCourseFeesFromCourseName(courses: Courses) {
    debugger;

    this.FeesTransactionService.GetCourseFeesFromCourseName(this.selectedFeesValue)

  }

  CreateStudentCourse(feesTransactions: FeesTransactions) {
    debugger;

      let body: FeesTransactions={

        Id:0,
        CourseId:this.registerFeesTransaction.controls.CourseName.value,
        //StudentId:1,
        StudentId:this.registerFeesTransaction.controls.StudentID.value,
        //CourseFees:this.registerFeesTransaction.controls.CourseFees.value,
        DateOfPayment:this.registerFeesTransaction.controls.DateofPayment.value,
        FeesPaid:this.registerFeesTransaction.controls.FeesAmount.value,
        FeesTakenBy:this.registerFeesTransaction.controls.FeesTakenBy.value
      }
    
      if (confirm("Do you want to submit?")) {
      this.FeesTransactionService.CreateStudentCourse(body)
      };
     
    
  }

}
