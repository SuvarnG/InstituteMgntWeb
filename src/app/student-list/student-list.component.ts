import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentslistService } from './studentslist.service';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  [x: string]: any;
  returnUrl:string;
  public students=[];

  constructor(private router: Router,
    private StudentslistService:StudentslistService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl='/create-student';
    this.GetAllStudents();
  }
  AddNewStudent(){
    this.router.navigate([this.returnUrl]);
  }

  GetAllStudents(){
    debugger;
    this.StudentslistService.GetAllStudents().subscribe(res=>this.students=res);
    }

    DeleteStudent(id:number){
      debugger;
      this.StudentslistService.DeleteStudent(id).subscribe(data=>this.GetAllStudents())

    }
  

}
