import { StudentModule } from './student/student.module';
import { SuperAdminModule } from './superAdmin/super-admin.module';
import { InstituteAdminModule } from './instituteAdmin/components/institute-admin.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ReportsModule } from './reports/reports.module';
import { StaffModule } from './staff/staff.module';
import { BankModule } from './bank/bank.module';
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
import { AuthService } from './auth/services/auth.service';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule, BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { FooterComponent } from './Core/Components/footer/footer.component';
import { RoleComponent } from './role/role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from './role/role.service';
import { DatePipe } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { RouterModule } from '@angular/router'
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { ExpenseTransactionModule } from './Expenses/Components/expensetransaction/expense-transaction.module';
import { BranchModule } from './instituteAdmin/components/branch/branch.module';
import { CreateStudentModule } from './student/components/create-student/create-student.module';
import { ExpenseMasterModule } from './Expenses/Components/expensetype/expense-master.module';
import { FeesTransactionModule } from './Student/Components/fees-transaction/fees-transaction/fees-transaction.module';
import { SidenavLayoutModule } from './layout/authorised/sidenav-layout/sidenav-layout.module';
import { StudentListModule } from './Student/Components/student-list/student-list.module';
import { AuthorizedSideNavService } from './Core/Components/authorised-side-nav/authorized-side-nav.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component'; 
import { CoursesModule } from './courses/courses.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthorisedTopNavComponent,
    AuthorisedSideNavTogglerComponent,
    AuthorisedLayoutComponent,
    AuthorisedSideNavComponent,
    FooterComponent,
    RoleComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
  ],
  imports: [
    StudentModule,
    SuperAdminModule,
    InstituteAdminModule,
    ExpensesModule,
    ReportsModule,
    StaffModule,
    CoursesModule,
    BankModule,
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
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers:
    [
      AuthService,
      RoleService,
      DatePipe,
      AuthorizedSideNavService,
      {provide: LocationStrategy, useClass: HashLocationStrategy},
      AuthGuard
    ],

  bootstrap: [AppComponent]
})
export class AppModule { }
