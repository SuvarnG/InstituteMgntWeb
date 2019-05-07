import { Component, OnInit, TemplateRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankService } from './bank.service';
import { Router, ActivatedRoute } from '@angular/router';
//import {Bank,CreateBankAccount} from '../Model/Bank';

import {Bank} from '../Model/Bank';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import {MustMatch} from './must-match.validator'

//import { MustMatch } from './bank/must-match.validator';
//import {CreateBankAccountService}from './Create-Bank-Account.service'; 

//import{CreateBankAccountService} from './bank.service'


@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent {
  modalRef: BsModalRef;
  registerForm: FormGroup;
  submitted = false;
  returnUrl: string;
    
    public banks=[];
  constructor(private modalService: BsModalService,private formBuilder: FormBuilder, private router: Router,
    private BankService: BankService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        BankName: ['', Validators.required],
        AccountNo: ['', [Validators.required,Validators.minLength(6)]],
        ReAccountNo: ['', Validators.required],
        Type: ['', Validators.required]
      }, {
        validator: MustMatch('AccountNo', 'ReAccountNo')
    });
    this.getBanks();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static'
    });
  }

  openModal1(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template1, {
      animated: true,
      backdrop: 'static'
    });
  }

  getBanks() {
   
    this.BankService.bankList().subscribe(res => this.banks = res);
    console.log(JSON.stringify(this.banks));
  }

  Delete(ID){
    var ans = confirm("Do you want to delete BankId : " + ID);  
    if (ans) {  
      this.BankService.Delete(ID).subscribe(data=>{
        this.getBanks();
      }, error => console.error(error))
  }
}

Submit(){

  let body={
    //ID:this.registerForm.controls.ID.value,
    BankName: this.registerForm.controls.BankName.value,
    AccountNumber :this.registerForm.controls.AccountNo.value,
    AccountType : this.registerForm.controls.Type.value
    // IsActive :this.registerForm.controls.IsActive.value
};

// this.BankService.CreateBankAccount(body).subscribe((data)=>{
//   this.router.navigate(['/Bank']);
this.BankService.Bank(body).subscribe((data)=>{
     this.router.navigate(['/Bank']);
})
}
}


  

 