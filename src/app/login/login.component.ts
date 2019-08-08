import { Component, OnInit, TemplateRef,OnDestroy, Injectable, Inject, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { FormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Resetpassword, ResponseData } from '../Model/User';
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
  submitted1:boolean=false;
  loginForm: any;
  ForgotPasswordForm: any;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  // modalRef2: BsModalRef;
  reset:Resetpassword[]
  forgotPasswordForm: any;
  createNewPasswordForm:FormGroup;
  mailSuccess:ResponseData[];
  successResponse=false;

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
      Email:['',Validators.required],
      verifyCode:['',Validators.required]
    })

    this.createNewPasswordForm = this.formBuilder.group({
      newPassword:['',Validators.required],
      verifyNewPassword:['',Validators.required]
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
  get np() {return this.createNewPasswordForm.controls}


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
    //this.submitted=true;
      if(!this.n.Email.value){
        return
      }

      this.LoginService.resetPassword(this.n.Email.value).subscribe(res => {
      this.mailSuccess=res;
      this.successResponse = this.mailSuccess['Response'];
      if(this.mailSuccess['Response']==true){
        alert('Verification code has been sent to your mail Id');
      }
      else{
        alert('Something went wrong...please confirm your mail Id')
      }
    });
  }


  submitVerifyCode(createNewPassowrdtemplate:TemplateRef<any>){
    if(this.mailSuccess['VerificationCode']==this.forgotPasswordForm.controls.verifyCode.value){
      alert('You can change password.');
      this.modalRef.hide();
      this.successResponse=false;
      this.forgotPasswordForm.reset();
      this.modalRef2=this.modalService.show(createNewPassowrdtemplate,{
        animated: true,
        backdrop: 'static'
      })

    } 
    else{
      alert('Sorry, Code is wrong.')
    }
  }

  onSubmitNewPassword(){
    debugger;
    this.submitted1=true;
    if(this.createNewPasswordForm.invalid){
      return
    }

    if(this.createNewPasswordForm.controls.newPassword.value != this.createNewPasswordForm.controls.verifyNewPassword.value){
      alert('Sorry, passwords did not match.')
      this.submitted1=false;
      return
    }

    this.submitted1=false;

    let body={
      Email:this.mailSuccess['EmailId'],
      Password:this.createNewPasswordForm.controls.newPassword.value
    }

    this.LoginService.updateUserPassword(body).subscribe(data=>{
      if(data==1){
        alert('You have successfully updated your password.')
        this.createNewPasswordForm.reset();
        this.modalRef2.hide();
      }
      else{
        alert('Something went wrong...Please try again')
        this.createNewPasswordForm.reset();
        this.modalRef2.hide();
      }
      
    })

  }


  onCancel(){
    this.forgotPasswordForm.reset();
    this.modalRef.hide();
    this.successResponse=false;
  }

  onCancelPasswordForm(){
    this.createNewPasswordForm.reset();
    this.modalRef2.hide();
    this.submitted1=false;
  }

}
