import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { RoleComponent } from './role/role.component';

const routes: Routes = [

    {
      path:'',
      redirectTo:'role',
      pathMatch:'full'
    },
    // {
    //   path:'role',
    //   component:RoleComponent,
    //   data:{
        
    //   }
  //  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
