import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  modalRef: BsModalRef;
  CreateBranchForm: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(private modalService: BsModalService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.CreateBranchForm = this.formBuilder.group({
      BranchName: ['', Validators.required],
      BranchAddress: ['', [Validators.required,Validators.minLength(6)]],
      ContactNumber: ['', Validators.required]
    });
  this.getBranches();
  }

  getBranches()
  {
    // this.BankService.bankList().subscribe(res => this.banks = res);
    // console.log(JSON.stringify(this.banks));
  }

}
