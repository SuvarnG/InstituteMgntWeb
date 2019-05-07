import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffListComponent } from './staff-list/staff-list.component';
import { TeacherCoursesComponent } from './teacher-courses/teacher-courses.component';
import { ExpensesComponent } from './expenses/expenses.component';
// import { ExpensesComponent } from './expenses/expenses.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'Expenses',
    pathMatch:'full',
  },
 { path: 'StaffList',
   component: StaffListComponent
},
{ path: 'Expenses',
   component: ExpensesComponent
},
{ path: 'TeacherCourses',
component: TeacherCoursesComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
