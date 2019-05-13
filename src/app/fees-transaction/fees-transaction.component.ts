import { Component, OnInit } from '@angular/core';
import { FeesTransactionService } from './fees-transaction.service';
import { Students,CreateStudent, FeesTransaction,User,CourseType, Courses,Users,Roles,RecentStudent, CourseFees } from '../Models/Students';


@Component({
  selector: 'app-fees-transaction',
  templateUrl: './fees-transaction.component.html',
  styleUrls: ['./fees-transaction.component.css']
})
export class FeesTransactionComponent implements OnInit {
  selectedUserValue:number;
  selectedFeesValue:number;


  constructor(private FeesTransactionService:FeesTransactionService) { }

  ngOnInit() {
    
  }


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

  GetCourseFeesFromCourseName(courses: Courses) {
    debugger;

    this.FeesTransactionService.GetCourseFeesFromCourseName(this.selectedFeesValue)

  }

  CreateStudentCourse(feesTransaction: FeesTransaction) {
    debugger;

    // this.CreateNewStudentService.GetRecentlyCreatedStudent()

    if (confirm("Do you want to submit?")) {
    }
  }

}
