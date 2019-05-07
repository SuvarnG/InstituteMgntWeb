import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { LeavesListComponent } from './leaves-list/leaves-list.component';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';
import { LoginComponent } from './login/login.component';
import { LeaveComponent } from './leave/leave.component';

const routes: Routes = [
  {    
    path: '',    
    redirectTo: 'login',    
    pathMatch: 'full',    
  },  
  {    
    path: 'login',    
    component: LoginComponent,    
    data: {    
      title: 'Login Page'    
    }    
  }, 
  {    
    path: 'Leave',    
    component: LeaveComponent,    
    data: {    
      title: 'Leave Page'    
    }    
  },    
  {    
    path: 'authorised-layout',    
    component:AuthorisedLayoutComponent ,    
    data: {    
      title: 'Layout Page'    
    }    
  },    {
    path:'StudentList',
    component:StudentListComponent
  },
  // {
  //   path:'LeavesList',
  //   component:LeavesListComponent
  // },
  {
    path:'CreateStudent',
    component:CreateStudentComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
