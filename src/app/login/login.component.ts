import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { FormsModule, Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Resetpassword } from '../Model/User';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

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
  ForgotPasswordForm: any;
  modalRef: BsModalRef;
  reset:Resetpassword[]
  forgotPasswordForm: any;

  constructor(private router: Router,
    private LoginService: LoginService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.forgotPasswordForm = this.formBuilder.group({
      Email:['',Validators.required]
    })


    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/authorised-layout';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  get n() {return this.forgotPasswordForm.controls;}

  
  LoginUser() {
    this.submitted = true;
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

  showForgotPasswordTemplate(template: TemplateRef<any>){

    
   // this.ForgotPasswordForm.controls.Email.reset();
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static'
    });
  }

ResetPassword(){
      this.LoginService.resetPassword(this.n.Email.value).subscribe(res => {
      this.modalRef.hide();
      console.log(JSON.stringify(res));
    });
  }

}
