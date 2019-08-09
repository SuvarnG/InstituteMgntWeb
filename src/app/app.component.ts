import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn$:Observable<boolean>;
  chkLoggedIn:boolean;
  constructor(private loginService: LoginService) {
  
  }
  ngOnInit(){
  this.isLoggedIn$ = this.loginService.isLoggedIn;
  this.chkLoggedIn=this.isLoggedIn$.source._isScalar;
  }

}
