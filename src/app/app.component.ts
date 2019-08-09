import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn$:Observable<boolean>;
  chkLoggedIn:boolean;
  constructor(private loginService: AuthService) {
  
  }
  ngOnInit(){
  this.isLoggedIn$ = this.loginService.isLoggedIn;
  this.chkLoggedIn=this.isLoggedIn$.source._isScalar;
  }

}
