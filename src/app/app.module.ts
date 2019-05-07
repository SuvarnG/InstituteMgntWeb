import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthorisedTopNavComponent } from './layout/authorised/authorised-top-nav/authorised-top-nav.component';
import { AuthorisedSideNavTogglerComponent } from './layout/authorised/authorised-side-nav-toggler/authorised-side-nav-toggler.component';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';
import { AuthorisedSideNavComponent } from './layout/authorised/authorised-side-nav/authorised-side-nav.component';
import { StudentListComponent } from './student-list/student-list.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { ModalModule } from 'ngx-bootstrap';
import { HttpClientModule} from '@angular/common/http';
import { StudentslistService } from './student-list/studentslist.service';
import { LeavesListComponent } from './leaves-list/leaves-list.component';
import { LeavelistService } from './leaves-list/leavelist.service';
import { CreateNewStudentService } from './create-student/create-new-student.service';
import { HttpClientModule} from '@angular/common/http';
import {LoginService} from './login/login.service';
import { EnquiryComponent } from './enquiry/enquiry.component';
import{EnquiryService} from './enquiry/enquiry.service';
import{LeaveService} from './leave/leave.service';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import{ModalModule} from 'ngx-bootstrap';
import { LeaveComponent } from './leave/leave.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // DashboardComponent,
    AuthorisedTopNavComponent,
    AuthorisedSideNavTogglerComponent,
    AuthorisedLayoutComponent,
    AuthorisedSideNavComponent,
    StudentListComponent,
    CreateStudentComponent,
    LeavesListComponent
    EnquiryComponent,
    LeaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
  ],
  providers: [StudentslistService,LeavelistService,CreateNewStudentService,LoginService,EnquiryService,LeaveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
