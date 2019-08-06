import { Component, OnInit } from '@angular/core';
import { ExpenseMasterService } from '../expense-master/expense-master.service';
import {ExpenseMaster,ExpenseReport,ExpenseReportList} from '../Model/Expenses'
import { FormsModule,ReactiveFormsModule,FormBuilder,FormGroup, Validators } from '@angular/forms';
import { BranchService } from '../branch/branch.service';
import {Branch} from '../Model/Branch'
import { Utils } from '../Utils';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { ExpenseReportService } from './expense-report.service';
import { toDate } from '@angular/common/src/i18n/format_date';
import { validateConfig } from '@angular/router/src/config';


@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.css']
})
export class ExpenseReportComponent implements OnInit {

  submitted = false;
  expenseList:ExpenseMaster[];
  branchList:Branch[];
  registerExpensesReport:FormGroup;
  expenseReportList:ExpenseReportList[];
  periodSelection:string;
  dateRange=false;
p:any;
  constructor(private expenseReportService:ExpenseReportService,
              private expenseMasterService:ExpenseMasterService,
              private formBuilder:FormBuilder,
              private branchService:BranchService) { }

  ngOnInit() {
    this.expenseMasterService.getAllExpenses().subscribe(res=>this.expenseList=res);
    this.branchService.getBranches(this.user.InstituteId).subscribe(res=>{this.branchList=res});

    this.registerExpensesReport=this.formBuilder.group({
      BranchName:[],
      Expense:[],
      FromDate:['',Validators.required],
      ToDate:['',Validators.required],
      period:['',Validators.required]
    })
  }

  get f() { return this.registerExpensesReport.controls; }

  public user = Utils.GetCurrentUser();

  pullExpenseReport(){

    

    this.submitted=true;
    if(this.registerExpensesReport.controls.period.invalid){
      return;
    }
    this.submitted=false;

    if(this.periodSelection=="OneMonth"){
      var todaysDate=new Date();
      var lastMonthDate=new Date();
      let body:ExpenseReport={
        BranchId:this.registerExpensesReport.controls.BranchName.value,
        ExpenseTypeId:this.registerExpensesReport.controls.Expense.value,
        ToDate:todaysDate,
        FromDate:new Date(lastMonthDate.setDate(lastMonthDate.getDay()-30)), 
        InstituteId:this.user.InstituteId       
       }
         this.expenseReportService.pullExpenseReport(body).subscribe(res=>{
         this.expenseReportList=res});
    }

    if(this.periodSelection=="ThreeMonth"){
      var todaysDate=new Date();
      var lastMonthDate=new Date();
      let body:ExpenseReport={
        BranchId:this.registerExpensesReport.controls.BranchName.value,
        ExpenseTypeId:this.registerExpensesReport.controls.Expense.value,
        ToDate:todaysDate,
        FromDate:new Date(lastMonthDate.setDate(lastMonthDate.getDay()-91)),  
        InstituteId:this.user.InstituteId      
       }
         this.expenseReportService.pullExpenseReport(body).subscribe(res=>{
         this.expenseReportList=res});
    }

    if(this.periodSelection=="SixMonth"){
      var todaysDate=new Date();
      var lastMonthDate=new Date();
      let body:ExpenseReport={
        BranchId:this.registerExpensesReport.controls.BranchName.value,
        ExpenseTypeId:this.registerExpensesReport.controls.Expense.value,
        ToDate:todaysDate,
        FromDate:new Date(lastMonthDate.setDate(lastMonthDate.getDay()-182)), 
        InstituteId:this.user.InstituteId      
       }
         this.expenseReportService.pullExpenseReport(body).subscribe(res=>{
         this.expenseReportList=res});
    }

    if(this.periodSelection=="SelectDateRange"){       
    this.submitted=true;
    if(this.registerExpensesReport.invalid){
      return;
    }
    this.submitted=false;
      
      let body:ExpenseReport={
        BranchId:this.registerExpensesReport.controls.BranchName.value,
        ExpenseTypeId:this.registerExpensesReport.controls.Expense.value,
        ToDate:this.registerExpensesReport.controls.ToDate.value,
        FromDate:this.registerExpensesReport.controls.FromDate.value,   
        InstituteId:this.user.InstituteId     
       }
         this.expenseReportService.pullExpenseReport(body).subscribe(res=>{
         this.expenseReportList=res});
    }
  }

  exportAsXLSX():void {
    this.expenseReportService.exportAsExcelFile(this.expenseReportList, 'Expense');
 }

 downloadPdf() {
  //const doc = new jsPDF();

  const doc = new jsPDF('p', 'mm', 'a4');
  
  const col = ['InstituteName', 'Expense Name', 'Amount Paid', 'Date',  'Paid By Whom'];
  const rows = [];

  const itemNew = this.expenseReportList;

  // itemNew.forEach(element => {
  //   // tslint:disable-next-line:max-line-length
  //   //const temp = [this.expenseReportList, element.caseNo, element.patientName, element.instName, element.payor, element.totalDrFee, element.drFeeToCollect];
  //   rows.push(itemNew);
  
  // });
  
    //doc.autoTable(col,rows);
    doc.text('Expense Report',10,10)
    doc.save('Test.pdf');
}

// getDateTime(){
//   this.currentDate=new Date()
// }

selectPeriod(event:any){
        this.periodSelection=event.target.value;
        if(this.periodSelection=="SelectDateRange"){
          this.dateRange=true;
        }
        else{
          this.dateRange=false;
        }
        
    }

}
