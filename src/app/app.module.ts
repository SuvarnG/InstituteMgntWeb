import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthorisedTopNavComponent } from './layout/authorised/authorised-top-nav/authorised-top-nav.component';
import { AuthorisedSideNavTogglerComponent } from './layout/authorised/authorised-side-nav-toggler/authorised-side-nav-toggler.component';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';
import { AuthorisedSideNavComponent } from './layout/authorised/authorised-side-nav/authorised-side-nav.component';
import { StudentListComponent } from './student-list/student-list.component';
import { CreateStudentComponent } from './create-student/create-student.component';
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
import { ReactiveFormsModule } from '@angular/forms';  
import { ModalModule } from 'ngx-bootstrap';
import { StaffListComponent } from './staff-list/staff-list.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { HttpClientModule} from '@angular/common/http';
import { ExpenseService } from './expenses/expense.service';
import { StaffListService } from './staff-list/staff-list.service';
import { TeacherCoursesService } from './teacher-courses/teacher-courses.service';


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
    ExpensesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
  ],
  providers: [sliderservice, StudentslistService,LeavelistService,CreateNewStudentService,LoginService,EnquiryService,LeaveService, StaffListService,ExpenseService,TeacherCoursesService],

  bootstrap: [AppComponent]
})
export class AppModule { }
