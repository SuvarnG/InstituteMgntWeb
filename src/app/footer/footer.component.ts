import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private loginService: LoginService) { }
  public currentYear;
  isLoggedIn$: Observable<boolean>;
  
  ngOnInit() {

    this.isLoggedIn$ = this.loginService.isLoggedIn;
    this.currentYear = new Date().getFullYear();
  }

}
