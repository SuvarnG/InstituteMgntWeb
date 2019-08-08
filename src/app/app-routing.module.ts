import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { LeavesListComponent } from './leaves-list/leaves-list.component';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';
import { LoginComponent } from './login/login.component';
import { LeaveComponent } from './leave/leave.component';
import { CoursesComponent } from './courses/courses.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { StaffListComponent } from './staff/staff-list.component';
import { TeacherCoursesComponent } from './teacher-courses/teacher-courses.component';
import { ExpensesComponent } from './ExpenseTransaction/expenses.component';
import { ExpenseMasterComponent } from './expense-master/expense-master.component';
import { FeesTransactionComponent } from './fees-transaction/fees-transaction.component';
import { BranchComponent } from './branch/branch.component';
import { RoleComponent } from './role/role.component';
import { BankComponent } from './bankaccount/bank.component';
import { BanktransactionComponent } from './banktransaction/banktransaction.component';
import { CoursetypeComponent } from './coursetype/coursetype.component';
import { ReportsComponent } from './reports/reports.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { FeesCollectionReportComponent } from './fees-collection-report/fees-collection-report.component';
import { EnquiryReportComponent } from './enquiry-report/enquiry-report.component';
import { StudentAdmissionsReportComponent } from './student-admissions-report/student-admissions-report.component';
import { InstituteComponent } from './institute/institute.component';
import { InstituteAdminComponent } from './institute-admin/institute-admin.component';
import { BranchManagerComponent } from './branch-manager/branch-manager.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'Leave',
        component: LeaveComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Dashboard',
        component: AuthorisedLayoutComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Enquiry',
        component: EnquiryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Leave',
        component: LeaveComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'LeaveList',
        component: LeavesListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'StudentList',
        component: StudentListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'CreateStudent',
        component: CreateStudentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Courses',
        component: CoursesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'StaffList',
        component: StaffListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Expenses',
        component: ExpensesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'TeacherCourses',
        component: TeacherCoursesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'ExpenseMaster',
        component: ExpenseMasterComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'FeesTransaction',
        component: FeesTransactionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Branch',
        component: BranchComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'role',
        component: RoleComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'BankTransaction',
        component: BanktransactionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Bank',
        component: BankComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'coursetype',
        component: CoursetypeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'ExpenseReport',
        component: ExpenseReportComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'FeesCollectionReport',
        component: FeesCollectionReportComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'EnquiryReport',
        component: EnquiryReportComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'StudentAdmissionsReport',
        component: StudentAdmissionsReportComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Institute',
        component: InstituteComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'InstituteAdmin',
        component: InstituteAdminComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'BranchManager',
        component: BranchManagerComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'Login',
        component: LoginComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
