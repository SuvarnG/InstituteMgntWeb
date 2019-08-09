import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './Student/Components/student-list/student-list.component';
import { CreateStudentComponent } from './student/components/create-student/create-student.component';
import { AuthorisedLayoutComponent } from './Core/Components/dashboard/dashboard.component';
import { LoginComponent } from './auth/components/login/login.component';
import { FeesTransactionComponent } from './Student/Components/fees-transaction/fees-transaction.component';
import { RoleComponent } from './role/role.component';
import { InstituteComponent } from './superAdmin/components/institute/institute.component';
import { InstituteAdminComponent } from './superAdmin/components/institute-admin/institute-admin.component';
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
        path: 'FeesTransaction',
        component: FeesTransactionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'role',
        component: RoleComponent,
        canActivate: [AuthGuard]
      },
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
