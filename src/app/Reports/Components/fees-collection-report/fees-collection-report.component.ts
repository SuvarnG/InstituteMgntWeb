import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../Courses/Services/courses.service';
import { Utils } from '../../../Core/Utils';
import { Course } from 'shared/Model/CourseType'
import { BranchService } from '../../../instituteAdmin/services/branch.service';
import { Branch } from 'shared/Model/Branch';
import { FeesReportInput, FeesReport } from 'shared/Model/Students'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-fees-collection-report',
  templateUrl: './fees-collection-report.component.html',
  styleUrls: ['./fees-collection-report.component.css']
})

export class FeesCollectionReportComponent implements OnInit {

  constructor(private coursesService: CoursesService,
    private branchService: BranchService,
    private reportsService: ReportsService,
    private formBuilder: FormBuilder) { }


  p: any;
  courseList: Course[];
  branchList: Branch[];
  registerFeesCollectionReport: FormGroup;
  feesReportList: FeesReport[];
  submitted = false;
  periodSelection: string;
  dateRange = false;

  ngOnInit() {
    this.branchService.getBranches(this.user.InstituteId).subscribe(res => { this.branchList = res })
    this.registerFeesCollectionReport = this.formBuilder.group({
      branchId: [],
      courseId: [],
      FromDate: ['', Validators.required],
      ToDate: ['', Validators.required],
      period: ['', Validators.required]
    })
  }

  public user = Utils.GetCurrentUser();

  get f() { return this.registerFeesCollectionReport.controls };

  selectBranch(id: number) {
    this.coursesService.courseList(this.user.InstituteId, id).subscribe(res => { this.courseList = res })
  }

  pullFeesCollectionReport() {
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
        InstituteId: this.user.InstituteId
      }
      this.reportsService.pullFeesCollectionReport(body).subscribe(res => {
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
        InstituteId: this.user.InstituteId
      }
      this.reportsService.pullFeesCollectionReport(body).subscribe(res => {
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
        InstituteId: this.user.InstituteId
      }
      this.reportsService.pullFeesCollectionReport(body).subscribe(res => {
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
        InstituteId: this.user.InstituteId
      }
      this.reportsService.pullFeesCollectionReport(body).subscribe(res => {
        this.feesReportList = res
      })
    }

  }

  exportAsXLSX(): void {
    this.reportsService.exportAsExcelFile(this.feesReportList, 'Fees Collection');
  }

  selectPeriod(event: any) {
    this.periodSelection = event.target.value
    if (this.periodSelection == "SelectDateRange") {
      this.dateRange = true;
    }
    else {
      this.dateRange = false;
    }
  }

}
