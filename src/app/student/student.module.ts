import { FeesTransactionComponent } from './components/fees-transaction/fees-transaction.component';
import { StudentslistService } from './services/studentslist.service';
import { CreateNewStudentService } from './services/create-new-student.service';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CreateStudentComponent } from './components/create-student/create-student.component';
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

@NgModule({
  declarations: [
    CreateStudentComponent,
    StudentListComponent,
    FeesTransactionComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeLayoutComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'studentlist',
            component: StudentListComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'createstudent',
            component: CreateStudentComponent,
            canActivate: [AuthGuard]
          }
        ]
      }
    ])
  ],
  providers:[
    CreateNewStudentService,
    StudentslistService
  ],
  exports:[
    FeesTransactionComponent
  ]
})
export class StudentModule { }
