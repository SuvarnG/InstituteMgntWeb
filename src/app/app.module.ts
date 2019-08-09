import { AuthGuard } from './auth/components/guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthorisedTopNavComponent } from './Core/Components/authorised-top-nav/authorised-top-nav.component';
import { AuthorisedSideNavTogglerComponent } from './layout/authorised/authorised-side-nav-toggler/authorised-side-nav-toggler.component';
import { AuthorisedLayoutComponent } from './Core/Components/dashboard/dashboard.component';
import { AuthorisedSideNavComponent } from './Core/Components/authorised-side-nav/authorised-side-nav.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StudentListComponent } from './Student/Components/student-list/student-list.component';
import { CreateStudentComponent } from './student/components/create-student/create-student.component';
import { StudentslistService } from './Student/Services/studentslist.service';
import { LeavesListComponent } from './leaves-list/leaves-list.component';
import { LeavelistService } from './leaves-list/leavelist.service';
import { CreateNewStudentService } from './student/services/create-new-student.service';
import { AuthService } from './auth/services/auth.service';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { EnquiryService } from './enquiry/enquiry.service';
import { LeaveService } from './leave/leave.service';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule, BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { LeaveComponent } from './leave/leave.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FooterComponent } from './Core/Components/footer/footer.component';
import { CoursesComponent } from './Courses/Components/course-list/courses.component';
import { CreateStaffComponent } from './staff/components/create-staff/create-staff.component';
import { StaffListComponent } from './Staff/Components/staff-list/staff-list.component';
import { ExpensesComponent } from './Expenses/Components/expensetransaction/expenses.component';
import { ExpenseService } from './Expenses/Services/expense.service';
import { StaffListService } from './Staff/Services/staff-list.service';
import { CreateStaffService } from './Staff/Services/create-staff.service';
import { RoleComponent } from './role/role.component';
import { BankComponent } from './bankaccount/bank.component';
import { BanktransactionComponent } from './banktransaction/banktransaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from './role/role.service';
import { BankService } from './bankaccount/bank.service';
import { DatePipe } from '@angular/common';
import { ExpenseMasterComponent } from './Expenses/Components/expensetype/expense-master.component';
import { ExpenseMasterService } from './Expenses/Services/expense-master.service';
import { FeesTransactionComponent } from './Student/Components/fees-transaction/fees-transaction.component';
import { FeesTransactionService } from './Student/Services/fees-transaction.service';
import { BranchComponent } from './instituteAdmin/components/branch/branch.component';
import { Routes } from '@angular/router';
import { BranchService } from './instituteAdmin/services/branch.service';
import { BanktransactionService } from './banktransaction/banktransaction.service';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { RouterModule } from '@angular/router'
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { CoursetypeComponent } from './Courses/Components/coursetype/coursetype.component';
import { ExpenseTransactionModule } from './Expenses/Components/expensetransaction/expense-transaction.module';
import { BranchModule } from './instituteAdmin/components/branch/branch.module';
import { CreateStudentModule } from './student/components/create-student/create-student.module';
import { ExpenseMasterModule } from './Expenses/Components/expensetype/expense-master.module';
import { FeesTransactionModule } from './Student/Components/fees-transaction/fees-transaction/fees-transaction.module';
import { SidenavLayoutModule } from './layout/authorised/sidenav-layout/sidenav-layout.module';
import { StudentListModule } from './Student/Components/student-list/student-list.module';
import { AuthorizedSideNavService } from './Core/Components/authorised-side-nav/authorized-side-nav.service';
import { ReportsComponent } from './Reports/Components/report-list/reports.component';
import { saveAs } from 'file-saver';
import { ExpenseReportComponent } from './Reports/Components/expense-report/expense-report.component';
import { FeesCollectionReportComponent } from './Reports/Components/fees-collection-report/fees-collection-report.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { EnquiryReportComponent } from './Reports/Components/enquiry-report/enquiry-report.component';
import { StudentAdmissionsReportComponent } from './Reports/Components/student-admissions-report/student-admissions-report.component';
import { ExportAsModule } from 'ngx-export-as';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Chart } from 'chart.js';
import { InstituteComponent } from './superAdmin/components/institute/institute.component';
import { InstituteAdminComponent } from './superAdmin/components/institute-admin/institute-admin.component';
import { BranchManagerComponent } from './instituteAdmin/components/branch-manager/branch-manager.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component'; 

const appRoutes: Routes = [
  { }];

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
    CreateStaffComponent,
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
    HomeLayoutComponent,
    LoginLayoutComponent,
    
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
      AuthService,
      EnquiryService,
      LeaveService,
      StaffListService,
      ExpenseService,
      CreateStaffService,
      RoleService,
      BankService,
      ExpenseMasterService,
      FeesTransactionService,
      DatePipe,
      BranchService,
      BanktransactionService,
      AuthorizedSideNavService,
      {provide: LocationStrategy, useClass: HashLocationStrategy},
      AuthGuard
    ],

  bootstrap: [AppComponent]
})
export class AppModule { }
