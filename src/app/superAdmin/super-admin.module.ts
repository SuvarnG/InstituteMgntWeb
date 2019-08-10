//import { InstituteService } from './components/institute/institute.service';
import { InstituteAdminService } from './services/institute-admin.service';
import { InstituteComponent } from './components/institute/institute.component';
import { InstituteAdminComponent } from './components/institute-admin/institute-admin.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../auth/components/guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomeLayoutComponent } from '../layouts/home-layout/home-layout.component';

@NgModule({
  declarations: [
    InstituteAdminComponent,
    InstituteComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeLayoutComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'institute',
            component: InstituteComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'instituteadmin',
            component: InstituteAdminComponent,
            canActivate: [AuthGuard]
          }
        ]
      }
    ])
  ],
  providers:[
    InstituteAdminService
  ]
})
export class SuperAdminModule { }
