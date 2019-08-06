import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses/courses.service';
import { Utils } from '../Utils';
import {Course} from '../Model/CourseType'
import { BranchService } from '../branch/branch.service';
import {Branch} from '../Model/Branch';
import { FeesCollectionReportService } from './fees-collection-report.service';
import {FeesReportInput,FeesReport} from '../Model/Students'
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fees-collection-report',
  templateUrl: './fees-collection-report.component.html',
  styleUrls: ['./fees-collection-report.component.css']
})
export class FeesCollectionReportComponent implements OnInit {
p:any;
  courseList:Course[];
  branchList:Branch[];
  registerFeesCollectionReport:FormGroup;
  feesReportList:FeesReport[];
  submitted=false;
  periodSelection:string;
  dateRange=false;

  constructor(private coursesService:CoursesService,
              private branchService:BranchService,
              private feesCollectionReportService:FeesCollectionReportService,
              private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.branchService.getBranches(this.user.InstituteId).subscribe(res=>{this.branchList=res})
    

    this.registerFeesCollectionReport=this.formBuilder.group({
      branchId:[],
      courseId:[],
      FromDate:['',Validators.required],
      ToDate:['',Validators.required],
      period:['',Validators.required]
    })
  }

  get f() {return this.registerFeesCollectionReport.controls};

  public user= Utils.GetCurrentUser();

  selectBranch(id:number){
      debugger;
      this.coursesService.courseList(this.user.InstituteId,id).subscribe(res=>{this.courseList=res})
  }


  pullFeesCollectionReport() {
    debugger;
    if (this.periodSelection == "SelectDateRange") {
      this.submitted = true;
      if (this.registerFeesCollectionReport.invalid) {
        return;
      }
      this.submitted = false;
      let body: FeesReportInput = {
        BranchId: this.registerFeesCollectionReport.controls.branchId.value,
        CourseId: this.registerFeesCollectionReport.controls.courseId.value,
        FromDate: this.registerFeesCollectionReport.controls.FromDate.value,
        ToDate: this.registerFeesCollectionReport.controls.ToDate.value,
        InstituteId:this.user.InstituteId
      }
      this.feesCollectionReportService.pullFeesCollectionReport(body).subscribe(res => {
        this.feesReportList = res
      })
    }

    this.submitted = true;
      if (this.registerFeesCollectionReport.controls.period.invalid) {
        return;
      }
      this.submitted = false;

    if (this.periodSelection == "OneMonth") {
      var todaysDate = new Date();
      var lastMonthDate = new Date();

      let body: FeesReportInput = {
        BranchId: this.registerFeesCollectionReport.controls.branchId.value,
        CourseId: this.registerFeesCollectionReport.controls.courseId.value,
        FromDate: new Date(lastMonthDate.setDate(lastMonthDate.getDay() - 30)),
        ToDate: todaysDate,
        InstituteId:this.user.InstituteId
      }
      this.feesCollectionReportService.pullFeesCollectionReport(body).subscribe(res => {
        this.feesReportList = res
      })
    }

    if (this.periodSelection == "ThreeMonth") {
      var todaysDate = new Date();
      var lastMonthDate = new Date();

      let body: FeesReportInput = {
        BranchId: this.registerFeesCollectionReport.controls.branchId.value,
        CourseId: this.registerFeesCollectionReport.controls.courseId.value,
        FromDate: new Date(lastMonthDate.setDate(lastMonthDate.getDay() - 91)),
        ToDate: todaysDate,
        InstituteId:this.user.InstituteId
      }
      this.feesCollectionReportService.pullFeesCollectionReport(body).subscribe(res => {
        this.feesReportList = res
      })
    }

    if (this.periodSelection == "SixMonth") {
      var todaysDate = new Date();
      var lastMonthDate = new Date();

      let body: FeesReportInput = {
        BranchId: this.registerFeesCollectionReport.controls.branchId.value,
        CourseId: this.registerFeesCollectionReport.controls.courseId.value,
        FromDate: new Date(lastMonthDate.setDate(lastMonthDate.getDay() - 182)),
        ToDate: todaysDate,
        InstituteId:this.user.InstituteId
      }
      this.feesCollectionReportService.pullFeesCollectionReport(body).subscribe(res => {
        this.feesReportList = res
      })
    }

  }

  exportAsXLSX():void {
    this.feesCollectionReportService.exportAsExcelFile(this.feesReportList, 'Fees Collection');
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
