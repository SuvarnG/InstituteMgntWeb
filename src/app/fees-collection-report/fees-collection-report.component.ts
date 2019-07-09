import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses/courses.service';
import { Utils } from '../Utils';
import {Course} from '../Model/CourseType'
import { BranchService } from '../branch/branch.service';
import {Branch} from '../Model/Branch';
import { FeesCollectionReportService } from './fees-collection-report.service';
import {FeesReportInput,FeesReport} from '../models/Students'
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fees-collection-report',
  templateUrl: './fees-collection-report.component.html',
  styleUrls: ['./fees-collection-report.component.css']
})
export class FeesCollectionReportComponent implements OnInit {

  courseList:Course[];
  branchList:Branch[];
  registerFeesCollectionReport:FormGroup;
  feesReportList:FeesReport[];
  submitted=false;

  constructor(private coursesService:CoursesService,
              private branchService:BranchService,
              private feesCollectionReportService:FeesCollectionReportService,
              private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.branchService.getBranches(this.user.InstituteId).subscribe(res=>{this.branchList=res})
    this.coursesService.courseList(this.user.InstituteId,this.user.BranchId).subscribe(res=>{this.courseList=res})

    this.registerFeesCollectionReport=this.formBuilder.group({
      branchId:[],
      courseId:[],
      FromDate:['',Validators.required],
      ToDate:['',Validators.required]
    })
  }

  get f() {return this.registerFeesCollectionReport.controls};

  public user= Utils.GetCurrentUser();

  pullFeesCollectionReport(){

    debugger;
    this.submitted=true;
    if(this.registerFeesCollectionReport.invalid){
      return;
    }

    let body:FeesReportInput={
      BranchId:this.registerFeesCollectionReport.controls.branchId.value,
      CourseId:this.registerFeesCollectionReport.controls.courseId.value,
      FromDate:this.registerFeesCollectionReport.controls.FromDate.value,
      ToDate:this.registerFeesCollectionReport.controls.ToDate.value
    }

    this.feesCollectionReportService.pullFeesCollectionReport(body).subscribe(res=>{
      this.feesReportList=res
    })

  }

  exportAsXLSX():void {
    debugger;
    this.feesCollectionReportService.exportAsExcelFile(this.feesReportList, 'Fees Collection');
 }


}
