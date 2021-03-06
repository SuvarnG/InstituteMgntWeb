export interface Expenses {
    Id: Number,
    ExpenseId:number,
    ExpenseType:string,
    AmountPaid: number,
    PaidByWhom: number,
    Email: string,
    Date: Date,
    Remark:string,
    Expenses:string,
    PaidByName:string,
    BranchId:number,
    Paid:number
}

export interface ExpenseChart{
    ExpenseName:string;
    PaidAmount:number;
}

export interface ExpenseMaster{
    ExpenseId:Number,
    Expenses:string
}

export interface ExpenseReport{
    BranchId:number;
    ExpenseTypeId:number;
    FromDate:Date;
    ToDate:Date;
}

export interface ExpenseReportList{
    BranchName:string;
    ExpenseName:string;
    AmountPaid:number;
    Date:Date;
    PaidBy:string;
}

export interface IncomeExpense{
    Income:number;
    Expense:number;
}