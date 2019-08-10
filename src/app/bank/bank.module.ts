import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BankService } from './services/bank.service';
import { BanktransactionComponent } from './components/banktransaction/banktransaction.component';
import { BankComponent } from './components/bankaccount/bank.component';
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
    BankComponent,
    BanktransactionComponent
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
        path: 'banktransaction',
        component: BanktransactionComponent,
        canActivate: [AuthGuard]
          },
          {
        path: 'bank',
        component: BankComponent,
        canActivate: [AuthGuard]
          }
        ]
      },
    ])
  ],
  providers:[
    BankService,
  ]
})
export class BankModule { }
