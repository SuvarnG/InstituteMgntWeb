import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { LeavesListComponent } from './leaves-list/leaves-list.component';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';
import { LoginComponent } from './login/login.component';
import { LeaveComponent } from './leave/leave.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CoursesComponent } from './courses/courses.component';
import { TestinomialsComponent } from './testinomials/testinomials.component';
import { SocialactComponent } from './socialact/socialact.component';
import { HomeComponent } from './home/home.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { TeacherCoursesComponent } from './teacher-courses/teacher-courses.component';
import { ExpensesComponent } from './ExpenseTransaction/expenses.component';
import { ExpenseMasterComponent } from './expense-master/expense-master.component';
import { FeesTransactionComponent } from './fees-transaction/fees-transaction.component';
import { BranchComponent } from './branch/branch.component';
import { RoleComponent } from './role/role.component';
import { BankComponent } from './bank/bank.component';
import { BanktransactionComponent } from './banktransaction/banktransaction.component';


const routes: Routes = [
 {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
    
  {    
    path: 'Login',    
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
  },  
  {
    path:'Enquiry',
    component:EnquiryComponent
  },
  {
    path:'Enquiry',
    component:EnquiryComponent
  },  
   {
    path:'Leave',
    component:LeaveComponent
  },
  {
    path:'StudentList',
    component:StudentListComponent
  },
    {
    path:'CreateStudent',
    component:CreateStudentComponent
  } ,
  {
    path:'AboutUs',
    component:AboutUsComponent
  },
  {
    path:'ContactUs',
    component:ContactUsComponent
  },
  {
    path:'Socialact',
    component:SocialactComponent
  },
  {
    path:'Testinomials',
    component:TestinomialsComponent
  },
  {
    path:'Courses',
    component:CoursesComponent
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

{ path: 'ExpenseMaster',
component: ExpenseMasterComponent
},

{ path: 'FeesTransaction',
component: FeesTransactionComponent
},

{ path: 'Branch',
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
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
