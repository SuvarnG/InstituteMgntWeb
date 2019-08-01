import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthorisedTopNavComponent } from './layout/authorised/authorised-top-nav/authorised-top-nav.component';
import { AuthorisedSideNavTogglerComponent } from './layout/authorised/authorised-side-nav-toggler/authorised-side-nav-toggler.component';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';
import { AuthorisedSideNavComponent } from './layout/authorised/authorised-side-nav/authorised-side-nav.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StudentListComponent } from './student-list/student-list.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentslistService } from './student-list/studentslist.service';
import { LeavesListComponent } from './leaves-list/leaves-list.component';
import { LeavelistService } from './leaves-list/leavelist.service';
import { CreateNewStudentService } from './create-student/create-new-student.service';
import { LoginService } from './login/login.service';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { EnquiryService } from './enquiry/enquiry.service';
import { LeaveService } from './leave/leave.service';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule, BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { LeaveComponent } from './leave/leave.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FooterComponent } from './footer/footer.component';
import { CoursesComponent } from './courses/courses.component';
import { TeacherCoursesComponent } from './teacher-courses/teacher-courses.component';
import { StaffListComponent } from './staff/staff-list.component';
import { ExpensesComponent } from './ExpenseTransaction/expenses.component';
import { ExpenseService } from './ExpenseTransaction/expense.service';
import { StaffListService } from './staff/staff-list.service';
import { TeacherCoursesService } from './teacher-courses/teacher-courses.service';
import { RoleComponent } from './role/role.component';
import { BankComponent } from './bankaccount/bank.component';
import { BanktransactionComponent } from './banktransaction/banktransaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from './role/role.service';
import { BankService } from './bankaccount/bank.service';
import { DatePipe } from '@angular/common';
import { ExpenseMasterComponent } from './expense-master/expense-master.component';
import { ExpenseMasterService } from './expense-master/expense-master.service';
import { FeesTransactionComponent } from './fees-transaction/fees-transaction.component';
import { FeesTransactionService } from './fees-transaction/fees-transaction.service';
import { BranchComponent } from './branch/branch.component';
import { Routes } from '@angular/router';
import { BranchService } from './branch/branch.service';
import { BanktransactionService } from './banktransaction/banktransaction.service';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { RouterModule } from '@angular/router'
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { CoursetypeComponent } from './coursetype/coursetype.component';
import { ExpenseTransactionModule } from './ExpenseTransaction/expense-transaction.module';
import { BranchModule } from './branch/branch.module';
import { CreateStudentModule } from './create-student/create-student.module';
import { ExpenseMasterModule } from './expense-master/expense-master.module';
import { FeesTransactionModule } from './fees-transaction/fees-transaction/fees-transaction.module';
import { SidenavLayoutModule } from './layout/authorised/sidenav-layout/sidenav-layout.module';
import { StaffListModule } from './staff/staff-list/staff-list.module';
import { StudentListModule } from './student-list/student-list.module';
import { AuthorizedSideNavService } from './layout/authorised/authorised-side-nav/authorized-side-nav.service';
import { ReportsComponent } from './reports/reports.component';
import { saveAs } from 'file-saver';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { FeesCollectionReportComponent } from './fees-collection-report/fees-collection-report.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { EnquiryReportComponent } from './enquiry-report/enquiry-report.component';
import { StudentAdmissionsReportComponent } from './student-admissions-report/student-admissions-report.component';
import { ExportAsModule } from 'ngx-export-as';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Chart } from 'chart.js';
import { InstituteComponent } from './institute/institute.component';
import { InstituteAdminComponent } from './institute-admin/institute-admin.component';
import { BranchManagerComponent } from './branch-manager/branch-manager.component'; 

const appRoutes: Routes = [
  { path: 'TeacherCourses', component: TeacherCoursesComponent }];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthorisedTopNavComponent,
    AuthorisedSideNavTogglerComponent,
    AuthorisedLayoutComponent,
    AuthorisedSideNavComponent,
    StudentListComponent,
    CreateStudentComponent,
    LeavesListComponent,
    EnquiryComponent,
    LeaveComponent,
    NavigationBarComponent,
    FooterComponent,
    CoursesComponent,
    TeacherCoursesComponent,
    StaffListComponent,
    ExpensesComponent,
    RoleComponent,
    BankComponent,
    BanktransactionComponent,
    ExpenseMasterComponent,
    FeesTransactionComponent,
    BranchComponent,
    CoursetypeComponent,
    ReportsComponent,
    ExpenseReportComponent,
    FeesCollectionReportComponent,
    EnquiryReportComponent,
    StudentAdmissionsReportComponent,
    InstituteComponent,
    InstituteAdminComponent,
    BranchManagerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    DataTablesModule,
    RouterModule,
    NgProgressModule.forRoot(),
    NgProgressRouterModule,
    ExpenseTransactionModule,
    BranchModule,
    CreateStudentModule,
    ExpenseMasterModule,
    FeesTransactionModule,
    SidenavLayoutModule,
    StudentListModule,
    StaffListModule,
    PDFExportModule,
    ExportAsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers:
    [
      StudentslistService,
      LeavelistService,
      CreateNewStudentService,
      LoginService,
      EnquiryService,
      LeaveService,
      StaffListService,
      ExpenseService,
      TeacherCoursesService,
      RoleService,
      BankService,
      ExpenseMasterService,
      FeesTransactionService,
      DatePipe,
      BranchService,
      BanktransactionService,
      AuthorizedSideNavService,
      {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],

  bootstrap: [AppComponent]
})
export class AppModule { }
