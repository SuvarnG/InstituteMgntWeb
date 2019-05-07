import { Component, OnInit, TemplateRef } from '@angular/core';
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

  constructor(private modalService: BsModalService,private router: Router,
    private ExpenseService: ExpenseService,
    private route: ActivatedRoute,private fb:FormBuilder) 
    { 

        this.expenseForm = this.fb.group({  
            expenseId: 0,  
            inputExpenseType: ['', [Validators.required]],  
            inputAmountPaid: ['', [Validators.required]],  
            inputDate: ['', [Validators.required]],  
            PaidByWhom: ['', [Validators.required]]  ,
            inputRemark: ['', [Validators.required]] 
        })  

        this.editExpenseForm = this.fb.group({  
          expenseId: 0,  
          expenseType: ['', [Validators.required]],  
          AmountPaid: ['', [Validators.required]],  
          Date: ['', [Validators.required]],  
          PaidByWhom: ['', [Validators.required]]  ,
          Remark: ['', [Validators.required]] 
      })  
    }

  ngOnInit() 
  {
    this.getAllExpenseTransction();
  }

  getAllExpenseTransction()
  {
   this.ExpenseService.expensesList().subscribe(res=>this.expenses=res);
  }

  AddNewExpense(addExpense: TemplateRef<any>)
  {
    debugger;
    this.ExpenseService.UserList();
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

  Save()
  {
    let body ={
      ExpenseType:this.expenseForm.controls.inputExpenseType.value,
      Paid: this.expenseForm.controls.inputAmountPaid.value,
      PaidByWhom: this.selectedUserValue,
      Date: this.expenseForm.controls.inputDate.value,
      Comment:this.expenseForm.controls.inputRemark.value
    }
      this.ExpenseService.saveExpense(body)  
                  .subscribe((data) => {  
                      this.router.navigate(['/Expenses']);  
                  }, error => this.errorMessage = error) 
  }

  Edit(editExpense: TemplateRef<any>,id,eId,type,Date,PaidByWhom,paid,remark)
  {
    debugger;

    this.Id=id;
    this.expenseId=eId;

    let body ={
      expenseType:type,
      AmountPaid:paid,
      PaidByWhom:PaidByWhom,
      Date:Date,
      Remark:remark,
      Id:id,
      ExpenseId:eId
    }
    this.editExpenseForm.patchValue(body); 

    this.modalRef = this.modalService.show(editExpense);
    this.ExpenseService.UserList();
  }

   Update()
   {
     debugger;
      let body ={
        ExpenseType:this.editExpenseForm.controls.expenseType.value,
        Paid: this.editExpenseForm.controls.AmountPaid.value,
        PaidByWhom: this.selectedUserValue,
        Date: this.editExpenseForm.controls.Date.value,
        Comment:this.editExpenseForm.controls.Remark.value,
        Id:this.Id,
        ExpenseId:this.expenseId
      }
      this.ExpenseService.updateExpense(body)  
      .subscribe((data) => {  
          this.router.navigate(['/Expenses']);  
      }, error => this.errorMessage = error)

      this.IsmodelShow=false;
   }

  get f()
  { 
    return this.editExpenseForm.controls; 
  }

  selectUser(event)
 {
   debugger;
    this.selectedUserValue =  event.target.value; 
 }
}
