import { StaffListService } from './services/staff-list.service';
import { LeaveService } from './services/leave.service';
import { EnquiryService } from './services/enquiry.service';
import { CreateStaffService } from './services/create-staff.service';
import { LeavelistService } from './services/leavelist.service';
import { LeaveComponent } from './components/leave/leave.component';
import { EnquiryComponent } from './components/enquiry/enquiry.component';
import { CreateStaffComponent } from './components/create-staff/create-staff.component';
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
import { StaffListComponent } from './Components/staff-list/staff-list.component';
import { LeavesListComponent } from './components/leaves-list/leaves-list.component';

@NgModule({
  declarations: [
  CreateStaffComponent,
  EnquiryComponent,
  LeaveComponent,
  LeavesListComponent,
  StaffListComponent  
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
          path: 'leave',
          component: LeaveComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'enquiry',
          component: EnquiryComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'leave',
          component: LeaveComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'leavelist',
          component: LeavesListComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'stafflist',
          component: StaffListComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'createstaff',
          component: CreateStaffComponent,
          canActivate: [AuthGuard]
        }
      ]
    }
    ])
  ],
  providers:[
CreateStaffService,
EnquiryService,
LeaveService,
LeavelistService,
StaffListService
  ]
})
export class StaffModule { }
