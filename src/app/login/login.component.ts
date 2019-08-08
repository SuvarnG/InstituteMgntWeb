import { Component, OnInit, TemplateRef,OnDestroy, Injectable, Inject, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { FormsModule, Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Resetpassword } from '../Model/User';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  returnUrl: string;
  errorMessage: any;
  submitted: boolean=false;
  loginForm: any;
  ForgotPasswordForm: any;
  modalRef: BsModalRef;
  reset:Resetpassword[]
  forgotPasswordForm: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private LoginService: LoginService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.renderer.addClass(this.document.body, 'bodyBackgroud');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.forgotPasswordForm = this.formBuilder.group({
      Email:['',Validators.required]
    })

    if(localStorage.getItem("CurrentUser")){
      console.log('Already Logged in')
      this.router.navigate(['/Dashboard'],{relativeTo: this.route});
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Dashboard';
  }

  ngOnDestroy() 
{
   
 this.renderer.removeClass(this.document.body, 'bodyBackgroud');

  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  get n() {return this.forgotPasswordForm.controls;}


  LoginUser() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.LoginService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(data => {
        //console.log('User after login:' + JSON.stringify(data));
        if (data && data.access_token && (data.roles=="Admin" || data.roles=="BranchManager")){
          this.router.navigate([this.returnUrl]);
        }
        else if(data && data.access_token && (data.roles=="Teacher")){
          this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/StudentList']);
        }
        else if(data && data.access_token && (data.roles=="SuperAdmin")){
          this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/Institute']);
        }
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
