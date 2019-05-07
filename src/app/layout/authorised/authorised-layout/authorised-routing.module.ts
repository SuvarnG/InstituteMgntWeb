import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthorisedLayoutComponent } from './authorised-layout.component';

const routes: Routes = [
  { path: 'authorised-layout', component: AuthorisedLayoutComponent }
];

@NgModule({
  exports: [ RouterModule],
  imports: [ RouterModule.forRoot(routes) ],
})

export class authorisedroutingModule{}

