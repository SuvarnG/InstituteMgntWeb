import { Component, OnInit } from '@angular/core';
import { AuthorisedSideNavService } from '../services/authorised-side-nav.service';
import { Utils} from '../../../Utils';
import { from } from 'rxjs';


@Component({
  selector: 'app-authorised-side-nav',
  templateUrl: './authorised-side-nav.component.html',
  styleUrls: ['./authorised-side-nav.component.css']
})
export class AuthorisedSideNavComponent implements OnInit {

  constructor(public sideNavService: AuthorisedSideNavService) { }
public currentRole:string; 

  ngOnInit() {
    this.checkStaff();
 }

  checkStaff(){
    debugger;
    this.currentRole = Utils.GetUserRole();
    console.log(JSON.stringify(this.currentRole));
  }

//   get users(): any {
//     return sessionStorage.getItem('CurrentUser');
// }

users = sessionStorage.getItem('CurrentUser')? JSON.parse(sessionStorage.getItem('CurrentUser')):[];
    
}
