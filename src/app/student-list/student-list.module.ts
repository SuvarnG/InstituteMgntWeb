import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorisedSideNavComponent } from '../layout/authorised/authorised-side-nav/authorised-side-nav.component';
import { AuthorisedTopNavComponent } from '../layout/authorised/authorised-top-nav/authorised-top-nav.component';
import { AuthorisedLayoutComponent } from '../layout/authorised/authorised-layout/authorised-layout.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [AuthorisedSideNavComponent,
                AuthorisedTopNavComponent,
                AuthorisedLayoutComponent],
  imports: [
    CommonModule,NgxPaginationModule
  ]
})
export class StudentListModule {
            AuthorisedTopNavComponent;
            AuthorisedSideNavComponent;
            AuthorisedLayoutComponent
 }
