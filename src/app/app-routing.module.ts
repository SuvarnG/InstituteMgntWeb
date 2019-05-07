import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { LeavesListComponent } from './leaves-list/leaves-list.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'StudentList',
    pathMatch:'full',
  },
  {
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
