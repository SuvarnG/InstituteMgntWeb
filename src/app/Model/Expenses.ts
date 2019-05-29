export interface Expenses {
    Id: Number,
    ExpenseId:number,
    expenseType:string,
    AmountPaid: number,
    PaidByWhom: number,
    Email: string,
    Date: Date,
    Remark:string,
    Expenses:string,
    PaidByName:string
}

export interface ExpenseMaster{
    ExpenseId:Number,
    Expenses:string
}