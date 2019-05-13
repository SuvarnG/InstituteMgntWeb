import { Component, OnInit, TemplateRef } from '@angular/core';
import { ExpenseMasterService } from './expense-master.service';
import {ExpenseMaster} from '../Model/Expenses';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-expense-master',
  templateUrl: './expense-master.component.html',
  styleUrls: ['./expense-master.component.css']
})
export class ExpenseMasterComponent implements OnInit {
expenses:ExpenseMaster[];
modalRef: BsModalRef;
CreateExpenseForm:FormGroup;
EditExpenseForm:FormGroup;
errorMessage:string;
expensId:Number;
  constructor(private fb:FormBuilder,private ExpenseMasterService:ExpenseMasterService,private modalService: BsModalService) { }

  ngOnInit() {
    this.CreateExpenseForm=this.fb.group({
      expense:['', [Validators.required]],
    }),
    this.EditExpenseForm=this.fb.group({
      expense:['', [Validators.required]],
    }),
    this.GetAllExpense();
  }
  GetAllExpense(){
  debugger;
  this.ExpenseMasterService.GetAllExpenses().subscribe(res=>this.expenses=res);
}

ShowCreateExpenseTemplate(CreateExpenseTemplate: TemplateRef<any>){

  this.CreateExpenseForm.controls.expense.reset();
  this.modalRef = this.modalService.show(CreateExpenseTemplate);
}
onSubmitCreateExpense()
{
  debugger;
  let body={
    Expenses:this.CreateExpenseForm.controls.expense.value
  }
  this.ExpenseMasterService.CreateNewExpense(body)  
  .subscribe((data) => {  
    this.modalRef.hide();
    this.GetAllExpense();
  }, error => this.errorMessage = error) 

}
DeleteExpense(id:any){
  var ans = confirm("Do you want to delete customer with Id: " + id);  
  if (ans) {  
      this.ExpenseMasterService.DeleteExpense(id).subscribe(data => {  
          this.GetAllExpense();  
      }, error => console.error(error))  
  }  
}

EditExpense(EditExpenseTemplate: TemplateRef<any>,expense)
{
  this.expensId=expense.ExpenseId;
  let body={
    expense:expense.Expenses
  }
  this.EditExpenseForm.patchValue(body);
  this.modalRef = this.modalService.show(EditExpenseTemplate);
}

onSubmitEditExpense()
{
  debugger;
  let body={
    Expenses:this.EditExpenseForm.controls.expense.value,
    ExpenseId:this.expensId
  }
  this.ExpenseMasterService.EditExpense(body)  
  .subscribe((data) => {  
    this.modalRef.hide();
    this.GetAllExpense();   
  }, error => this.errorMessage = error)
}
}
