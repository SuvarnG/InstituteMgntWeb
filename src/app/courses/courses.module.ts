import { CoursetypeService } from './services/coursetype.service';
import { CoursesService } from './services/courses.service';
import { CoursetypeComponent } from './components/coursetype/coursetype.component';
import { CoursesComponent } from './components/course-list/courses.component';
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
    CoursesComponent,
    CoursetypeComponent
  ],
  imports: [
    DataTablesModule ,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    Ng2SearchPipeModule,
    NgxPaginationModule ,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeLayoutComponent,
        canActivate: [AuthGuard],
        children: [
          {
        path: 'courses',
        component: CoursesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'coursetype',
        component: CoursetypeComponent,
        canActivate: [AuthGuard]
      }
  ]
}
    ])
  ],
  providers:[
    CoursesService,
    CoursetypeService
  ]
})
export class CoursesModule { }
