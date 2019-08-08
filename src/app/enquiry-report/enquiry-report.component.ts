import { Component, OnInit } from '@angular/core';
import { EnquiryReportService } from './enquiry-report.service';
import { BranchService } from '../branch/branch.service';
import { Utils } from './../Utils';
import {Branch} from '../shared/Model/Branch'
import {EnquiryReportInput,EnquiryReport} from '../shared/Model/EnquiryList'
import { CoursesService } from '../courses/courses.service';
import {Course} from '../shared/Model/CourseType'
import { FormsModule,FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-enquiry-report',
  templateUrl: './enquiry-report.component.html',
  styleUrls: ['./enquiry-report.component.css']
})
export class EnquiryReportComponent implements OnInit {
p:any;
  branchList:Branch[];
  courseList:Course[];
  enquiryReportList:EnquiryReport[];
  registerEnquiryReport:FormGroup;
  submitted=false;
  periodSelection:string;
  dateRange=false;

  constructor(private branchService:BranchService,
              private coursesService:CoursesService,
              private formBuilder:FormBuilder,
              private enquiryReportService:EnquiryReportService,
              private exportAsService:ExportAsService) { }

  ngOnInit() {
    this.branchService.getBranches(this.user.InstituteId).subscribe(res=>{this.branchList=res});
   

    this.registerEnquiryReport=this.formBuilder.group({
      BranchName:[],
      CourseName:[],
      FromDate:['',Validators.required],
      ToDate:['',Validators.required],
      period:['',Validators.required]
    })
  }

  public user = Utils.GetCurrentUser();

  get f() {return this.registerEnquiryReport.controls}

  pullEnquiryReport(){

    

    if(this.periodSelection=="SelectDateRange"){

    this.submitted=true;
    if(this.registerEnquiryReport.invalid){
      return;
    }
    this.submitted=false;
    let body:EnquiryReportInput={
      BranchId:this.registerEnquiryReport.controls.BranchName.value,
      CourseId:this.registerEnquiryReport.controls.CourseName.value,
      FromDate:this.registerEnquiryReport.controls.FromDate.value,
      ToDate:this.registerEnquiryReport.controls.ToDate.value,
      InstituteId:this.user.InstituteId
    }

    return this.enquiryReportService.pullEnquiryReport(body).subscribe(res=>{
      this.enquiryReportList=res
    });
  }

  this.submitted=true;
  if(this.registerEnquiryReport.controls.period.invalid){
    return;
  }
  this.submitted=false;

  if(this.registerEnquiryReport.controls.period.invalid){
    return;
  }
  this.submitted=false;

  if(this.periodSelection=="OneMonth"){
    var todaysDate=new Date();
    var lastMonthDate=new Date();

    let body:EnquiryReportInput={
      BranchId:this.registerEnquiryReport.controls.BranchName.value,
      CourseId:this.registerEnquiryReport.controls.CourseName.value,
      FromDate:new Date(lastMonthDate.setDate(lastMonthDate.getDay()-30)),
      ToDate:todaysDate,
      InstituteId:this.user.InstituteId
    }

    return this.enquiryReportService.pullEnquiryReport(body).subscribe(res=>{
      this.enquiryReportList=res
    });

  }

  if(this.periodSelection=="ThreeMonth"){
    var todaysDate=new Date();
    var lastMonthDate=new Date();

    let body:EnquiryReportInput={
      BranchId:this.registerEnquiryReport.controls.BranchName.value,
      CourseId:this.registerEnquiryReport.controls.CourseName.value,
      FromDate:new Date(lastMonthDate.setDate(lastMonthDate.getDay()-91)),
      ToDate:todaysDate,
      InstituteId:this.user.InstituteId
    }

    return this.enquiryReportService.pullEnquiryReport(body).subscribe(res=>{
      this.enquiryReportList=res
    });

  }

  if(this.periodSelection=="SixMonth"){
    var todaysDate=new Date();
    var lastMonthDate=new Date();

    let body:EnquiryReportInput={
      BranchId:this.registerEnquiryReport.controls.BranchName.value,
      CourseId:this.registerEnquiryReport.controls.CourseName.value,
      FromDate:new Date(lastMonthDate.setDate(lastMonthDate.getDay()-182)),
      ToDate:todaysDate,
      InstituteId:this.user.InstituteId
    }

    return this.enquiryReportService.pullEnquiryReport(body).subscribe(res=>{
      this.enquiryReportList=res
    });

  }
  }

  selectBranch(id:number){
    this.coursesService.courseList(this.user.InstituteId,id).subscribe(res=>{this.courseList=res});
  }

  exportAsXLSX():void {
    this.enquiryReportService.exportAsExcelFile(this.enquiryReportList, 'Enquiry');
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
