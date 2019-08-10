import { ReportsService } from './services/reports.service';
import { ExpenseReport } from './../shared/Model/Expenses';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../auth/components/guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomeLayoutComponent } from '../layouts/home-layout/home-layout.component';
import { ReportsComponent } from './components/report-list/reports.component';
import { ExpenseReportComponent } from './components/expense-report/expense-report.component';
import { FeesCollectionReportComponent } from './components/fees-collection-report/fees-collection-report.component';
import { EnquiryReportComponent } from './components/enquiry-report/enquiry-report.component';
import { StudentAdmissionsReportComponent } from './components/student-admissions-report/student-admissions-report.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { ExportAsModule } from 'ngx-export-as';

@NgModule({
  declarations: [
    ReportsComponent,
    ExpenseReportComponent,
    FeesCollectionReportComponent ,
    EnquiryReportComponent,
    StudentAdmissionsReportComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    DataTablesModule,
    PDFExportModule,
    ExportAsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeLayoutComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'reports',
            component: ReportsComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'expensereport',
            component: ExpenseReportComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'feescollectionreport',
            component: FeesCollectionReportComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'enquiryreport',
            component: EnquiryReportComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'studentadmissionsreport',
            component: StudentAdmissionsReportComponent,
            canActivate: [AuthGuard]
          }
        ]
      }
    ])
  ],
  providers:[
    ReportsService
  ]
})
export class ReportsModule { }
