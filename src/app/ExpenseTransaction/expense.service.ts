import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Expenses, ExpenseMaster,ExpenseChart, IncomeExpense } from '../Model/Expenses';
import { map, tap, catchError, debounceTime } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../Model/User';
import { StaffMaster } from '../Model/StaffMaster';
import { Utils } from '../Utils';
// import { from, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class ExpenseService {
  private Url = environment.APIBASEURL + 'Expenses/GetAll_tran';
  private deleteUrl = environment.APIBASEURL + 'Expenses/DeleteExpense/';
  private editUrl = environment.APIBASEURL + 'Expenses/UpdateExpense_Tran/';
  listUser: User[];
  public listStaff: StaffMaster[];
  listExpenseType: ExpenseMaster[];


  constructor(private http: HttpClient) { }

  getAuthHeader(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Utils.GetAccessToken()}`
      })      
    };
    return httpOptions
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  expensesList(BranchId:number) {
    return this.http.get<Expenses[]>( environment.APIBASEURL + 'Expenses/GetAll_tran'+'/'+BranchId, this.getAuthHeader())
      .pipe(map(Expenses => {
        console.log(Expenses);
        return Expenses;
      }));
  }

  expensesChartList(BranchId:number) {
    
    return this.http.post<ExpenseChart[]>( environment.APIBASEURL + 'Expenses/GetExpensesData_Chart'+'/'+BranchId,null, this.getAuthHeader());
  }

  getIncomeAndExpenseData(BranchId:number){
    
    return this.http.post<IncomeExpense[]>(environment.APIBASEURL + 'Expenses/GetIncomeAndExpenseData'+'/'+BranchId,null, this.getAuthHeader())
  }

  deleteExpense(id): Observable<Expenses> {
    return this.http.post<Expenses>(this.deleteUrl + id, this.getAuthHeader()).pipe(
      tap(_ => console.log(`deleted expense id=${id}`)),
      catchError(this.handleError<Expenses>('deleteExpense'))
    );
  }
  errorHandler(errorHandler: any) {
    throw new Error("Method not implemented.");
  }

  saveExpense(expense): Observable<Expenses> {
    // let body: Expenses = expense;
    return this.http.post<Expenses>(environment.APIBASEURL + 'Expenses/CreateExpense_Tran', expense, this.getAuthHeader())
      .pipe(
        tap((expense: Expenses) => console.log(`added expenseid=${expense.ExpenseId}`)),
        catchError(this.handleError<Expenses>('saveExpense'))
      );
  }

  updateExpense(expense): Observable<Expenses> {
    return this.http.post<Expenses>(environment.APIBASEURL + 'Expenses/UpdateExpense_Tran', expense, this.getAuthHeader())
      .pipe(
        tap((expense: Expenses) => console.log(`added expenseid=${expense.ExpenseId}`)),
        catchError(this.handleError<Expenses>('updateExpense'))
      );
  }

 }
