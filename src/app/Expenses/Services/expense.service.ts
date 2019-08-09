import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Expenses, ExpenseMaster, ExpenseChart, IncomeExpense } from 'shared/Model/Expenses';
import { map, tap, catchError, debounceTime } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from 'shared/Model/User';
import { StaffMaster } from 'shared/Model/StaffMaster';
import { Utils } from '../../Core/Utils';



@Injectable({
  providedIn: 'root'
})

export class ExpenseService {
  listUser: User[];
  public listStaff: StaffMaster[];
  listExpenseType: ExpenseMaster[];

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  expensesList(BranchId: number) {
    return this.http.get<Expenses[]>(environment.APIBASEURL + 'Expenses/GetAllExpense_tran' + '/' + BranchId, Utils.getAuthHeader())
      .pipe(map(Expenses => {
        console.log(Expenses);
        return Expenses;
      }));
  }

  monthwiseExpensesChartList(BranchId: number) {
    return this.http.post<ExpenseChart[]>(environment.APIBASEURL + 'Chart/GetMonthwiseExpensesData_Chart' + '/' + BranchId, null, Utils.getAuthHeader());
  }

  currentMonthExpensesChartList(BranchId: number) {
    return this.http.post<ExpenseChart[]>(environment.APIBASEURL + 'Chart/GetCurrentMonthExpense' + '/' + BranchId, null, Utils.getAuthHeader());
  }

  getIncomeAndExpenseData(BranchId: number) {
    return this.http.post<IncomeExpense[]>(environment.APIBASEURL + 'Chart/GetIncomeAndExpenseData' + '/' + BranchId, null, Utils.getAuthHeader())
  }

  deleteExpense(id): Observable<Expenses> {
    return this.http.post<Expenses>(environment.APIBASEURL + 'Expenses/DeleteExpense_Tran' + '/' + id, null, Utils.getAuthHeader()).pipe(
      tap(_ => console.log(`deleted expense id=${id}`)),
      catchError(this.handleError<Expenses>('deleteExpense'))
    );
  }
  errorHandler(errorHandler: any) {
    throw new Error("Method not implemented.");
  }

  saveExpense(expense): Observable<Expenses> {
    return this.http.post<Expenses>(environment.APIBASEURL + 'Expenses/CreateExpense_Tran', expense, Utils.getAuthHeader())
      .pipe(
        tap((expense: Expenses) => console.log(`added expenseid=${expense.ExpenseId}`)),
        catchError(this.handleError<Expenses>('saveExpense'))
      );
  }

  updateExpense(expense): Observable<Expenses> {
    return this.http.post<Expenses>(environment.APIBASEURL + 'Expenses/UpdateExpense_Tran', expense, Utils.getAuthHeader())
      .pipe(
        tap((expense: Expenses) => console.log(`added expenseid=${expense.ExpenseId}`)),
        catchError(this.handleError<Expenses>('updateExpense'))
      );
  }


}
