export interface Expenses {
    Id: Number,
    ExpenseId:number,
    expenseType:string,
    AmountPaid: number,
    PaidByWhom: string,
    Email: string,
    Date: Date,
    Remark:string,
    Expenses:string
}

export interface ExpenseMaster{
    ExpenseId:Number,
    Expenses:string
}