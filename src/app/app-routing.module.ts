import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './Student/Components/student-list/student-list.component';
import { CreateStudentComponent } from './student/components/create-student/create-student.component';
import { AuthorisedLayoutComponent } from './Core/Components/dashboard/dashboard.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ExpensesComponent } from './Expenses/Components/expensetransaction/expenses.component';
import { ExpenseMasterComponent } from './Expenses/Components/expensetype/expense-master.component';
import { FeesTransactionComponent } from './Student/Components/fees-transaction/fees-transaction.component';
import { BranchComponent } from './instituteAdmin/components/branch/branch.component';
import { RoleComponent } from './role/role.component';
import { InstituteComponent } from './superAdmin/components/institute/institute.component';
import { InstituteAdminComponent } from './superAdmin/components/institute-admin/institute-admin.component';
import { BranchManagerComponent } from './instituteAdmin/components/branch-manager/branch-manager.component';
import { AuthGuard } from './auth/components/guards/auth.guard';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'Dashboard',
        component: AuthorisedLayoutComponent,
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
        path: 'Expenses',
        component: ExpensesComponent,
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
