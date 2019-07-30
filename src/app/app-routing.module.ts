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


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },

  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Leave',
    component: LeaveComponent,
  },
  {
    path: 'Dashboard',
    component: AuthorisedLayoutComponent,
  },
  {
    path: 'Enquiry',
    component: EnquiryComponent
  },
  {
    path: 'Leave',
    component: LeaveComponent
  },
  {
    path: 'LeaveList',
    component: LeavesListComponent
  },
  {
    path: 'StudentList',
    component: StudentListComponent
  },
  {
    path: 'CreateStudent',
    component: CreateStudentComponent
  },
  {
    path: 'Courses',
    component: CoursesComponent
  },
  {
    path: 'StaffList',
    component: StaffListComponent
  },
  {
    path: 'Expenses',
    component: ExpensesComponent
  },
  {
    path: 'TeacherCourses',
    component: TeacherCoursesComponent
  },
  {
    path: 'ExpenseMaster',
    component: ExpenseMasterComponent
  },
  {
    path: 'FeesTransaction',
    component: FeesTransactionComponent
  },
  {
    path: 'Branch',
    component: BranchComponent
  },
  {
    path: 'role',
    component: RoleComponent
  },
  {
    path: 'BankTransaction',
    component: BanktransactionComponent
  },
  {
    path: 'Bank',
    component: BankComponent
  },
  {
    path: 'coursetype',
    component: CoursetypeComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'ExpenseReport',
    component: ExpenseReportComponent
  },
  {
    path: 'FeesCollectionReport',
    component: FeesCollectionReportComponent
  },
  {
    path: 'EnquiryReport',
    component: EnquiryReportComponent
  },
  {
    path: 'StudentAdmissionsReport',
    component: StudentAdmissionsReportComponent
  },
  {
    path: 'Institute',
    component: InstituteComponent
  },
  {
    path: 'InstituteAdmin',
    component: InstituteAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
