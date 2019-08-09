import { BranchManagerService } from './../services/branch-manager.service';
import { BranchService } from './../services/branch.service';
import { BranchManagerComponent } from './branch-manager/branch-manager.component';
import { BranchManager } from 'shared/Model/Branch';
import { BranchComponent } from './branch/branch.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../auth/components/guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomeLayoutComponent } from '../../layouts/home-layout/home-layout.component';

@NgModule({
  declarations: [
    BranchComponent,
   BranchManagerComponent
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
            path: 'branch',
            component: BranchComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'branchmanager',
            component: BranchManagerComponent,
            canActivate: [AuthGuard]
          }
        ]
      }
    ])
  ],
  providers:[
    BranchService,
    BranchManagerService
  ]
})
export class InstituteAdminModule { }
