import { Component, OnInit } from '@angular/core';
import { FeesTransactionService } from './fees-transaction.service';
import { Students,CreateStudent,FeesTransactions, FeesTransaction,User,CourseType, Courses,Users,Roles,RecentStudent, CourseFees } from '../Models/Students';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fees-transaction',
  templateUrl: './fees-transaction.component.html',
  styleUrls: ['./fees-transaction.component.css']
})
export class FeesTransactionComponent implements OnInit {
  selectedUserValue:number;
  selectedFeesValue:number;
  registerFeesTransaction:FormGroup;
  submitFeesTransaction:boolean;


  constructor(private FeesTransactionService:FeesTransactionService,private formBuilder: FormBuilder,
              private router:Router) { }

  ngOnInit() {
    this.FeesTransactionService.getAllCourseType();
    this.FeesTransactionService.getUsersListForFeesTaken();

    this.registerFeesTransaction=this.formBuilder.group({
      CourseType:['',Validators.required],
      CourseName:['',Validators.required],
      CourseFees:['',Validators.required],
      StudentID:['',Validators.required],
      FeesAmount:['',Validators.required],
      DateofPayment:['',Validators.required],
      FeesTakenBy:['',Validators.required]
    })
   
  }

  get g() { return this.registerFeesTransaction.controls; }

  selectUser(event) {
    this.selectedUserValue = event.target.value;
  }

  selectFees(event) {
    this.selectedFeesValue = event.target.value;
  }

  getCourseNameFromCourseType(courses: Courses) {
    this.FeesTransactionService.getCourseNameFromCourseType(this.selectedUserValue)
  }

  getStudentListFromCourseName(student: Students) {
    this.FeesTransactionService.getStudentListFromCourseName(this.selectedFeesValue)
  }

  getCourseFeesFromCourseName(courses: Courses) {
    this.FeesTransactionService.getCourseFeesFromCourseName(this.selectedFeesValue)

  }

  createStudentCourse(feesTransactions: FeesTransactions) {

    debugger;
    this.submitFeesTransaction=true;
    if(this.registerFeesTransaction.invalid){
      return
    }

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
      this.FeesTransactionService.createStudentCourse(body).subscribe(data=>{
              this.router.navigateByUrl('/FeesTransaction')
      });
      // this.registerFeesTransaction.controls.CourseName.reset();
      // this.registerFeesTransaction.controls.StudentID.reset();
      // this.registerFeesTransaction.controls.DateofPayment.reset();
      // this.registerFeesTransaction.controls.FeesAmount.reset();
      // this.registerFeesTransaction.controls.FeesTakenBy.reset()
     
      };
     
    
  }

}
