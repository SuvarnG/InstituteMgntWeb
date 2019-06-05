import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorisedLayoutComponent } from 'src/app/layout/authorised/authorised-layout/authorised-layout.component';
import { AuthorisedSideNavComponent } from 'src/app/layout/authorised/authorised-side-nav/authorised-side-nav.component';
import { AuthorisedTopNavComponent } from 'src/app/layout/authorised/authorised-top-nav/authorised-top-nav.component';
@NgModule({
  declarations: [
    AuthorisedLayoutComponent,
    AuthorisedSideNavComponent,
    AuthorisedTopNavComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AuthorisedLayoutComponent,
    AuthorisedSideNavComponent,
    AuthorisedTopNavComponent
    
  ]
})
export class BranchModule { }
