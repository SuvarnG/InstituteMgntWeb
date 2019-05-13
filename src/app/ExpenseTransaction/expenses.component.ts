import { Component, OnInit, TemplateRef, Pipe } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ExpenseService } from './expense.service';
import {  NgForm, FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { Expenses } from '../Model/Expenses';
import { User } from '../Model/User';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
@Pipe({
  name: 'dateFormat'
})
export class ExpensesComponent implements OnInit {
  expenseForm: FormGroup;  
  Id:number;
  expenseId:number;
  errorMessage: any;
  modalRef: BsModalRef;
  returnUrl: string;
  editExpenseForm:FormGroup;
  IsmodelShow:false;
 public  listUser :User[];
  public expenses: Expenses[];
  selectedUserValue: Number ;
  submitted = false;
  constructor(private modalService: BsModalService,private router: Router,
    private ExpenseService: ExpenseService,
    private route: ActivatedRoute,private fb:FormBuilder) 
    {  }

  ngOnInit() 
  {
    this.expenseForm = this.fb.group({    
     ExpenseType: ['', [Validators.required]],  
     AmountPaid: ['', [Validators.required]],  
     Date: ['', [Validators.required]],  
    PaidByWhom: ['', [Validators.required]]  ,
    Remark: ['', [Validators.required]] 
  })  

  this.editExpenseForm = this.fb.group({  
    ExpenseType: ['', [Validators.required]],  
    AmountPaid: ['', [Validators.required]],  
    Date: ['', [Validators.required]],  
    PaidByWhom: ['', [Validators.required]]  ,
    Remark: ['', [Validators.required]] 
})  
    this.getAllExpenseTransction();
  }

  getAllExpenseTransction()
  {
    debugger;
   this.ExpenseService.expensesList().subscribe(res=>this.expenses=res);
  }

  AddNewExpense(addExpense: TemplateRef<any>)
  {
    debugger;
    this.ExpenseService.UserList();
    this.ExpenseService.GetAllExpenseType();
    this.modalRef = this.modalService.show(addExpense);
  }

  Delete(expenseID) 
  {  
    var ans = confirm("Do you want to delete customer with Id: " + expenseID);  
    if (ans) {  
        this.ExpenseService.deleteExpense(expenseID).subscribe(data => {  
            this.getAllExpenseTransction();  
        }, error => console.error(error))  
    }  
  }  

  onSubmit()
  {
    debugger;
    if (this.expenseForm.invalid==true) {
      this.submitted = true;
      return;
     }
     else{
      this.submitted = false;
    let body ={
      ExpenseType:this.expenseForm.controls.ExpenseType.value,
      Paid: this.expenseForm.controls.AmountPaid.value,
      PaidByWhom: this.selectedUserValue,
      Date: this.expenseForm.controls.Date.value,
      Remark:this.expenseForm.controls.Remark.value
    }
      this.ExpenseService.saveExpense(body)  
                  .subscribe((data) => {  
                    this.modalRef.hide();
                    this.getAllExpenseTransction(); 
                  }, error => this.errorMessage = error) 
    }
  }

  Edit(editExpense: TemplateRef<any>,e)
  {
    debugger;
    console.log(e);
    this.Id=e.Id;
    this.expenseId=e.ExpenseId;

    this.editExpenseForm.patchValue({
      ExpenseType:e.ExpenseType,
      AmountPaid:e.Paid,
      PaidByWhom:e.PaidByWhom,
      Date:e.Date,
      Remark:e.Remark,
      Id:e.Id,
      ExpenseId:e.ExpenseId
    });
   // this.editExpenseForm.patchValue(body); 
    this.modalRef = this.modalService.show(editExpense);
    this.ExpenseService.GetAllExpenseType();
    this.ExpenseService.UserList();
  }

  onSubmitEdit()
   {
     debugger;
     if (this.editExpenseForm.invalid==true) {
      this.submitted = true;
      return;
     }
     else{
      this.submitted = false;
      let body ={
        ExpenseType:this.editExpenseForm.controls.ExpenseType.value,
        Paid: this.editExpenseForm.controls.AmountPaid.value,
        PaidByWhom: this.selectedUserValue,
        Date: this.editExpenseForm.controls.Date.value,
        Remark:this.editExpenseForm.controls.Remark.value,
        Id:this.Id,
        ExpenseId:this.expenseId
      }
      this.ExpenseService.updateExpense(body)  
      .subscribe((data) => {  
        this.modalRef.hide();
        this.getAllExpenseTransction();   
      }, error => this.errorMessage = error)
    }
   }

  get f()
  { 
    return this.expenseForm.controls; 
  }
  get form()
  { 
    return this.editExpenseForm.controls; 
  }

  selectUser(event)
 {
   debugger;
    this.selectedUserValue =  event.target.value; 
 }
}
