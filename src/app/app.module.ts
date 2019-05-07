import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthorisedTopNavComponent } from './layout/authorised/authorised-top-nav/authorised-top-nav.component';
import { AuthorisedSideNavTogglerComponent } from './layout/authorised/authorised-side-nav-toggler/authorised-side-nav-toggler.component';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';
import { AuthorisedSideNavComponent } from './layout/authorised/authorised-side-nav/authorised-side-nav.component';
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
    DashboardComponent,
    AuthorisedTopNavComponent,
    AuthorisedSideNavTogglerComponent,
    AuthorisedLayoutComponent,
    AuthorisedSideNavComponent,
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
    ModalModule.forRoot()
  ],
  providers: [StaffListService,ExpenseService,TeacherCoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
