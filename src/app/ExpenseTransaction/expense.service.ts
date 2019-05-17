import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Expenses, ExpenseMaster } from '../Model/Expenses';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../Model/User';
// import { from, Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ExpenseService {
  private Url = environment.APIBASEURL + 'Expenses/GetAll_tran';
  private deleteUrl = environment.APIBASEURL + 'Expenses/DeleteExpense/';
  private editUrl = environment.APIBASEURL + 'Expenses/UpdateExpense_Tran/';
  listUser: User[];
  listExpenseType: ExpenseMaster[];
  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  expensesList() {
    return this.http.get<Expenses[]>(this.Url, httpOptions)
      .pipe(map(Expenses => {
        console.log(Expenses);
        return Expenses;
      }));
  }

  deleteExpense(id): Observable<Expenses> {
    return this.http.post<Expenses>(this.deleteUrl + id, httpOptions).pipe(
      tap(_ => console.log(`deleted expense id=${id}`)),
      catchError(this.handleError<Expenses>('deleteExpense'))
    );
  }
  errorHandler(errorHandler: any) {
    throw new Error("Method not implemented.");
  }

  saveExpense(expense): Observable<Expenses> {
    debugger;
    // let body: Expenses = expense;
    return this.http.post<Expenses>(environment.APIBASEURL + 'Expenses/CreateExpense_Tran', expense, httpOptions)
      .pipe(
        tap((expense: Expenses) => console.log(`added expenseid=${expense.ExpenseId}`)),
        catchError(this.handleError<Expenses>('saveExpense'))
      );
  }

  updateExpense(expense): Observable<Expenses> {
    return this.http.post<Expenses>(environment.APIBASEURL + 'Expenses/UpdateExpense_Tran', expense, httpOptions)
      .pipe(
        tap((expense: Expenses) => console.log(`added expenseid=${expense.ExpenseId}`)),
        catchError(this.handleError<Expenses>('updateExpense'))
      );
  }

  userList() {
    this.http.get(environment.APIBASEURL + 'Expenses/GetAllUsers').toPromise().then(result => this.listUser = result as User[])
  }

  getAllExpenseType() {
    this.http.get(environment.APIBASEURL + 'Expenses/GetAll').toPromise().then(result => this.listExpenseType = result as ExpenseMaster[])
  }
}
