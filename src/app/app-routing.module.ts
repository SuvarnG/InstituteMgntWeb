import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
  },    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
