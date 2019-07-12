import { Component, OnInit, TemplateRef } from '@angular/core';
import { ExpenseMasterService } from './expense-master.service';
import {ExpenseMaster} from '../Model/Expenses';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-expense-master',
  templateUrl: './expense-master.component.html',
  styleUrls: ['./expense-master.component.css']
})
export class ExpenseMasterComponent implements OnInit {
expenses:ExpenseMaster[];
modalRef: BsModalRef;
createExpenseForm:FormGroup;
editExpenseForm:FormGroup;
errorMessage:string;
expensId:Number;
submitted=false;
dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private fb:FormBuilder,private expenseMasterService:ExpenseMasterService,private modalService: BsModalService) { }

  ngOnInit() {
    this.dtOptions = {
      // retrieve: true,
      // paging: false,
      pagingType: 'full_numbers',
      pageLength: 4

    };
    this.createExpenseForm=this.fb.group({
      expense:['', [Validators.required]],
    }),
    this.editExpenseForm=this.fb.group({
      expense:['', [Validators.required]],
    }),
    this.getAllExpense();
  }


  get f() {return this.createExpenseForm.controls}

  getAllExpense(){
  this.expenseMasterService.getAllExpenses().subscribe(res=> {
    this.expenses=res;
    this.dtTrigger.next();
});
  }

showCreateExpenseTemplate(CreateExpenseTemplate: TemplateRef<any>){

  this.createExpenseForm.controls.expense.reset();
  this.modalRef = this.modalService.show(CreateExpenseTemplate, {
    animated: true,
    backdrop: 'static'
  });
}
onSubmitCreateExpense()
{
  this.submitted=true;
  if(this.createExpenseForm.invalid){
    return;
  }

  let body={
    Expenses:this.createExpenseForm.controls.expense.value
  }
  this.expenseMasterService.createNewExpense(body)  
  .subscribe((data) => {  
    this.modalRef.hide();
    this.getAllExpense();
  }, error => this.errorMessage = error) 

}
deleteExpense(expenseName:any,id:number){
  var ans = confirm("Do you want to delete the expense: " + expenseName);  
  if (ans) {  
      this.expenseMasterService.deleteExpense(id).subscribe(data => {  
          this.getAllExpense();  
      }, error => console.error(error))  
  }  
}

editExpense(EditExpenseTemplate: TemplateRef<any>,expense)
{
  this.expensId=expense.ExpenseId;
  let body={
    expense:expense.Expenses
  }
  this.editExpenseForm.patchValue(body);
  this.modalRef = this.modalService.show(EditExpenseTemplate, {
    animated: true,
    backdrop: 'static'
  });
}

onSubmitEditExpense()
{
  let body={
    Expenses:this.editExpenseForm.controls.expense.value,
    ExpenseId:this.expensId
  }
  this.expenseMasterService.editExpense(body)  
  .subscribe((data) => {  
    this.modalRef.hide();
    this.getAllExpense();   
  }, error => this.errorMessage = error)
}
}
