import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthorisedTopNavComponent } from './layout/authorised/authorised-top-nav/authorised-top-nav.component';
import { AuthorisedSideNavTogglerComponent } from './layout/authorised/authorised-side-nav-toggler/authorised-side-nav-toggler.component';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';
import { AuthorisedSideNavComponent } from './layout/authorised/authorised-side-nav/authorised-side-nav.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StudentListComponent } from './student-list/student-list.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentslistService } from './student-list/studentslist.service';
import { LeavesListComponent } from './leaves-list/leaves-list.component';
import { LeavelistService } from './leaves-list/leavelist.service';
import { CreateNewStudentService } from './create-student/create-new-student.service';
import {LoginService} from './login/login.service';
import { EnquiryComponent } from './enquiry/enquiry.component';
import{EnquiryService} from './enquiry/enquiry.service';
import{LeaveService} from './leave/leave.service';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import{ModalModule} from 'ngx-bootstrap';
import { LeaveComponent } from './leave/leave.component';
import { HomeComponent } from './home/home.component';
import { sliderservice } from './sliderservice.service';
import { SliderComponent } from './slider/slider.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CoursesComponent } from './courses/courses.component';
import { SocialactComponent } from './socialact/socialact.component';
import { TestinomialsComponent } from './testinomials/testinomials.component';
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
import {DatePipe} from '@angular/common';
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
    HomeComponent,
    SliderComponent,
    NavigationBarComponent,
    FooterComponent,
    HeaderComponent,
    ContactUsComponent,
    AboutUsComponent,
    CoursesComponent,
    SocialactComponent,
    TestinomialsComponent,
     TeacherCoursesComponent,
    StaffListComponent,
    ExpensesComponent,
    RoleComponent,
    BankComponent,
    BanktransactionComponent,
    ExpenseMasterComponent,
    FeesTransactionComponent,
    BranchComponent,
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
    NgProgressRouterModule
  ],
  providers: 
  [sliderservice, 
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
],

  bootstrap: [AppComponent]
})
export class AppModule { }
