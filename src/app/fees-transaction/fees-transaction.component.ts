import { Component, OnInit, TemplateRef } from '@angular/core';
import { FeesTransactionService } from './fees-transaction.service';
import { Students,CreateStudent,FeesTransactions, FeesTransaction,User,CourseType, Courses,Users,Roles,RecentStudent, CourseFees } from '../Models/Students';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalModule,BsModalRef,BsModalService } from 'ngx-bootstrap';


@Component({
  selector: 'app-fees-transaction',
  templateUrl: './fees-transaction.component.html',
  styleUrls: ['./fees-transaction.component.css']
})
export class FeesTransactionComponent implements OnInit {
  selectedUserValue:number;
  selectedFeesValue:number;
  selectedStudentId:number;
  remainingFees:number;
  registerFeesTransaction:FormGroup;
  submitFeesTransaction:boolean;
  modalRef:BsModalRef


  constructor(public FeesTransactionService:FeesTransactionService,private formBuilder: FormBuilder,
              private router:Router, private modalService:BsModalService) { }

  ngOnInit() {
    this.FeesTransactionService.GetAllCourses();
    this.FeesTransactionService.getUsersListForFeesTaken();

    this.registerFeesTransaction=this.formBuilder.group({
      //CourseType:['',Validators.required],
      CourseName:['',Validators.required],
      CourseFees:['',Validators.required],
      StudentID:['',Validators.required],
     // PaidAmount:[],
      FeesAmount:['',Validators.required],
      DateofPayment:['',Validators.required],
      FeesTakenBy:['',Validators.required],
      RemainingFees:[]
      //TotalPaidAmount:['',Validators.required]
    })
   
  }

  get g() { return this.registerFeesTransaction.controls; }

  selectUser(event) {
    this.selectedUserValue = event.target.value;
  }

  selectFees(event) {
    this.selectedFeesValue = event.target.value;
  }

  selectStudent(event){
    debugger;
    this.selectedStudentId = event.target.value;
  }

  // getCourseNameFromCourseType(courses: Courses) {
  //   this.FeesTransactionService.getCourseNameFromCourseType(this.selectedUserValue)
  // }

  getStudentListFromCourseName() {
    this.FeesTransactionService.getStudentListFromCourseName(this.selectedFeesValue)
  }

  getTotalFeesForStudentCourse(){
    this.FeesTransactionService.getTotalFeesForStudentCourse(this.selectedStudentId)
  }

  getFeesTransactionDetails() {
    debugger;
    this.FeesTransactionService.getFeesTransactionDetails(this.selectedStudentId)
  }

  // getCourseFeesFromCourseName(courses: Courses) {
  //   this.FeesTransactionService.getCourseFeesFromCourseName(this.selectedFeesValue)

  // }


  // openFeesTransactionHistory(template:TemplateRef<any>){
  //   debugger;
  //   this.modalRef=this.modalService.show(template)
  // }


  createStudentCourse() {

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
        //FeesPaid:this.registerFeesTransaction.controls.TotalPaidAmount.value,
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

  calculateTotalPaidFees(fees:number){
    debugger;
     this.registerFeesTransaction.controls.TotalPaidAmount.setValue(fees+this.registerFeesTransaction.controls.FeesAmount.value)  
  }

  calculateRemainingFees(){
    debugger;
    let sum = 0;
    for (var i = 0; i < this.FeesTransactionService.listFeesTransactions.length; i++) {
      console.log(this.FeesTransactionService.listFeesTransactions[i]['FeesPaid']);
        sum += this.FeesTransactionService.listFeesTransactions[i]['FeesPaid'];
    }

    console.log(sum)

    this.remainingFees = (this.registerFeesTransaction.controls.CourseFees.value-sum)

    console.log(this.remainingFees)

    this.registerFeesTransaction.controls.RemainingFees.setValue(this.remainingFees)
  }

}
