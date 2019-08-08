import { Component, OnInit } from '@angular/core';
import { BranchService } from '../branch/branch.service';
import { Utils } from '../Utils';
import { Branch } from '../shared/Model/Branch';
import { CoursesService } from '../courses/courses.service';
import { Course } from '../shared/Model/CourseType';
import { FormsModule,FormBuilder,FormGroup, Validators } from '@angular/forms';
import {StudentReportInput,StudentReport} from '../shared/Model/Students'
import { StudentAdmissionsReportService } from './student-admissions-report.service';

@Component({
  selector: 'app-student-admissions-report',
  templateUrl: './student-admissions-report.component.html',
  styleUrls: ['./student-admissions-report.component.css']
})
export class StudentAdmissionsReportComponent implements OnInit {

  branchList:Branch[];
  courseList:Course[];
  submitted=false;
  registerStudentAdmissionReport:FormGroup;
  studentAdmissionReportList:StudentReport[];
  periodSelection:string;
  dateRange=false;
p:any;
  constructor(private branchService:BranchService,
              private coursesService:CoursesService,
              private formBuilder:FormBuilder,
              private studentAdmissionsReportService:StudentAdmissionsReportService) { }

  ngOnInit() {
    this.branchService.getBranches(this.user.InstituteId).subscribe(res=>{this.branchList=res});

    this.registerStudentAdmissionReport=this.formBuilder.group({
      BranchName:[],
      CourseName:[],
      FromDate:['',Validators.required],
      ToDate:['',Validators.required],
      period:['',Validators.required]
    })
  }

  public user = Utils.GetCurrentUser();

  get f() {return this.registerStudentAdmissionReport.controls}

  pullStudentAdmissionReport(){

    if(this.periodSelection=="SelectDateRange"){
    this.submitted=true;
    if(this.registerStudentAdmissionReport.invalid){      
      return;
    }
    this.submitted=false;

    let body:StudentReportInput={
      BranchId:this.registerStudentAdmissionReport.controls.BranchName.value,
      CourseId:this.registerStudentAdmissionReport.controls.CourseName.value,
      FromDate:this.registerStudentAdmissionReport.controls.FromDate.value,
      ToDate:this.registerStudentAdmissionReport.controls.ToDate.value,
      InstituteId:this.user.InstituteId
    }

    return this.studentAdmissionsReportService.pullStudentAdmissionReport(body).subscribe(res=>{
      this.studentAdmissionReportList=res
    });
  }

  this.submitted=true;
  if(this.registerStudentAdmissionReport.controls.period.invalid){      
    return;
  }
  this.submitted=false;

  if(this.periodSelection=="OneMonth"){
    var todaysDate=new Date();
    var lastMonthDate=new Date();
    let body:StudentReportInput={
      BranchId:this.registerStudentAdmissionReport.controls.BranchName.value,
      CourseId:this.registerStudentAdmissionReport.controls.CourseName.value,
      FromDate:new Date(lastMonthDate.setDate(lastMonthDate.getDay()-30)),
      ToDate:todaysDate,
      InstituteId:this.user.InstituteId
    }

    return this.studentAdmissionsReportService.pullStudentAdmissionReport(body).subscribe(res=>{
      this.studentAdmissionReportList=res
    });
  }

  if(this.periodSelection=="ThreeMonth"){
    var todaysDate=new Date();
    var lastMonthDate=new Date();
    let body:StudentReportInput={
      BranchId:this.registerStudentAdmissionReport.controls.BranchName.value,
      CourseId:this.registerStudentAdmissionReport.controls.CourseName.value,
      FromDate:new Date(lastMonthDate.setDate(lastMonthDate.getDay()-91)),
      ToDate:todaysDate,
      InstituteId:this.user.InstituteId
    }

    return this.studentAdmissionsReportService.pullStudentAdmissionReport(body).subscribe(res=>{
      this.studentAdmissionReportList=res
    });
  }

  if(this.periodSelection=="SixMonth"){
    var todaysDate=new Date();
    var lastMonthDate=new Date();
    let body:StudentReportInput={
      BranchId:this.registerStudentAdmissionReport.controls.BranchName.value,
      CourseId:this.registerStudentAdmissionReport.controls.CourseName.value,
      FromDate:new Date(lastMonthDate.setDate(lastMonthDate.getDay()-182)),
      ToDate:todaysDate,
      InstituteId:this.user.InstituteId
    }

    return this.studentAdmissionsReportService.pullStudentAdmissionReport(body).subscribe(res=>{
      this.studentAdmissionReportList=res
    });
  }

  }

  selectBranch(id:number){
    this.coursesService.courseList(this.user.InstituteId,id).subscribe(res=>{this.courseList=res});
  }

  exportAsXLSX():void {
    this.studentAdmissionsReportService.exportAsExcelFile(this.studentAdmissionReportList, 'Student_Admission');
 }

 selectPeriod(event:any){
  this.periodSelection=event.target.value
  if(this.periodSelection=="SelectDateRange"){
    this.dateRange=true;
  }
  else{
    this.dateRange=false;
  }
  
}
}
