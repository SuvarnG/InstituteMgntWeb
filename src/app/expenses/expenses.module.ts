import { ExpenseService } from './services/expense.service';
import { ExpenseMasterService } from './services/expense-master.service';
import { ExpensesComponent } from './components/expensetransaction/expenses.component';
import { ExpenseMasterComponent } from './components/expensetype/expense-master.component';
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
  ExpenseMasterComponent,
  ExpensesComponent  
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
        path: 'expenses',
        component: ExpensesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'expensetype',
        component: ExpenseMasterComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
    ])
  ],
  providers:[
    ExpenseMasterService,
    ExpenseService
  ]
})
export class ExpensesModule { }
