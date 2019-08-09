import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorisedLayoutComponent } from './Core/Components/dashboard/dashboard.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RoleComponent } from './role/role.component';
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
