import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Email: string='riya@gmail.com';
  Password: string='riya1996';
  returnUrl: string;

  errorMessage: string;
  constructor(private router: Router,
    private LoginService: LoginService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    sessionStorage.setItem('Email', 'password');
    sessionStorage.clear();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/authorised-layout';


  }

  LoginUser() {
        this.LoginService.login(this.Email, this.Password)

      .pipe(first())
      .subscribe(data => {
        console.log('User after login:' + JSON.stringify(data));
        if (data && data.Email)
          this.router.navigate([this.returnUrl]);
        else
        this.errorMessage='Invalid Email or Password!'
      });
  }
  
 
}
