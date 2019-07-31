import { StudentslistService } from './../../../student-list/studentslist.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Utils } from 'src/app/Utils';
import { StudentPendingFeesList } from 'src/app/Model/Students';

@Component({
  selector: 'app-authorised-top-nav',
  templateUrl: './authorised-top-nav.component.html',
  styleUrls: ['./authorised-top-nav.component.css']
})
export class AuthorisedTopNavComponent implements OnInit {
  _cookieService: any;
StudentList:StudentPendingFeesList[];
  constructor(private router: Router,private studentslistService:StudentslistService) { }

  ngOnInit() {
    this.getAllStudentsPendingFeesDetails();
    console.log(this.user)
  }

  Logout(){
    console.log(1);
    localStorage.removeItem('CurrentUser');
    this.router.navigate(['/Login']);
  }
  getAllStudentsPendingFeesDetails(){
    this.studentslistService.getAllStudentsPendingFeesDetails(this.user.BranchId).subscribe(res=>{
      this.StudentList=res;
      console.log(this.StudentList);
      })
  }
  public user = Utils.GetCurrentUser();


}
