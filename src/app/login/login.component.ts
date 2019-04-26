import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  UserName: string;
  Password: string;
  
   constructor() { }

  ngOnInit() {
    }

  LoginUser(){
    if(this.UserName == "Admin" && this.Password == "Admin")
    {
      console.log("Welcome User");
    }
    else{
      console.log("Error");
    }
  }

}
