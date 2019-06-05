import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { FormsModule, Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  errorMessage: any;
  submitted: boolean;
  loginForm: any;

  constructor(private router: Router,
    private LoginService: LoginService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/authorised-layout';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  LoginUser() {
    this.submitted = true;
    debugger;
    this.LoginService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(data => {
        console.log('User after login:' + JSON.stringify(data));
        if (data && data.access_token)
          this.router.navigate([this.returnUrl]);
      },
        error => {
          this.errorMessage = 'Invalid Email or Password!'
        });
  }

  

}
