import { Component, OnInit } from '@angular/core';
import { EnquiryReportService } from './enquiry-report.service';
import { BranchService } from '../branch/branch.service';
import { Utils } from '../Utils';
import {Branch} from '../Model/Branch'
import {EnquiryReportInput,EnquiryReport} from '../models/EnquiryList'
import { CoursesService } from '../courses/courses.service';
import {Course} from '../model/CourseType'
import { FormsModule,FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-enquiry-report',
  templateUrl: './enquiry-report.component.html',
  styleUrls: ['./enquiry-report.component.css']
})
export class EnquiryReportComponent implements OnInit {

  branchList:Branch[];
  courseList:Course[];
  enquiryReportList:EnquiryReport[];
  registerEnquiryReport:FormGroup;
  submitted=false;

  constructor(private branchService:BranchService,
              private coursesService:CoursesService,
              private formBuilder:FormBuilder,
              private enquiryReportService:EnquiryReportService,
              private exportAsService:ExportAsService) { }

  ngOnInit() {
    this.branchService.getBranches(this.user.InstituteId).subscribe(res=>{this.branchList=res});
    this.coursesService.courseList(this.user.InstituteId,this.user.BranchId).subscribe(res=>{this.courseList=res});

    this.registerEnquiryReport=this.formBuilder.group({
      BranchName:[],
      CourseName:[],
      FromDate:['',Validators.required],
      ToDate:['',Validators.required]
    })
  }

  public user = Utils.GetCurrentUser();

  get f() {return this.registerEnquiryReport.controls}

  pullEnquiryReport(){
    this.submitted=true;
    if(this.registerEnquiryReport.invalid){
      this.submitted=false;
      return;
    }

    let body:EnquiryReportInput={
      BranchId:this.registerEnquiryReport.controls.BranchName.value,
      CourseId:this.registerEnquiryReport.controls.CourseName.value,
      FromDate:this.registerEnquiryReport.controls.FromDate.value,
      ToDate:this.registerEnquiryReport.controls.ToDate.value
    }

    return this.enquiryReportService.pullEnquiryReport(body).subscribe(res=>{this.enquiryReportList=res});
  }

  exportAsXLSX():void {
    debugger;
    this.enquiryReportService.exportAsExcelFile(this.enquiryReportList, 'Enquiry');
 }

}
