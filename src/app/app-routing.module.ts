import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './Student/Components/student-list/student-list.component';
import { CreateStudentComponent } from './student/components/create-student/create-student.component';
import { AuthorisedLayoutComponent } from './Core/Components/dashboard/dashboard.component';
import { LoginComponent } from './auth/components/login/login.component';
import { LeaveComponent } from './staff/components/leave/leave.component';
import { CoursesComponent } from './Courses/Components/course-list/courses.component';
import { EnquiryComponent } from './staff/components/enquiry/enquiry.component';
import { StaffListComponent } from './Staff/Components/staff-list/staff-list.component';
import { CreateStaffService } from './staff/services/create-staff.service';
import { ExpensesComponent } from './Expenses/Components/expensetransaction/expenses.component';
import { ExpenseMasterComponent } from './Expenses/Components/expensetype/expense-master.component';
import { FeesTransactionComponent } from './Student/Components/fees-transaction/fees-transaction.component';
import { BranchComponent } from './instituteAdmin/components/branch/branch.component';
import { RoleComponent } from './role/role.component';
import { BankComponent } from './bank/components/bankaccount/bank.component';
import { BanktransactionComponent } from './bank/components/banktransaction/banktransaction.component';
import { CoursetypeComponent } from './Courses/Components/coursetype/coursetype.component';
import { ReportsComponent } from './Reports/Components/report-list/reports.component';
import { ExpenseReportComponent } from './Reports/Components/expense-report/expense-report.component';
import { FeesCollectionReportComponent } from './Reports/Components/fees-collection-report/fees-collection-report.component';
import { EnquiryReportComponent } from './Reports/Components/enquiry-report/enquiry-report.component';
import { StudentAdmissionsReportComponent } from './Reports/Components/student-admissions-report/student-admissions-report.component';
import { InstituteComponent } from './superAdmin/components/institute/institute.component';
import { InstituteAdminComponent } from './superAdmin/components/institute-admin/institute-admin.component';
import { BranchManagerComponent } from './instituteAdmin/components/branch-manager/branch-manager.component';
import { AuthGuard } from './auth/components/guards/auth.guard';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { CreateStaffComponent } from './staff/components/create-staff/create-staff.component';
import { LeavesListComponent } from './staff/components/leaves-list/leaves-list.component';

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
        path: 'CreateStaff',
        component: CreateStaffComponent,
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
