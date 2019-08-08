import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Bank } from '../shared/Model/Bank'
import { map, tap, catchError } from 'rxjs/operators'; import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Utils } from '../Utils';


@Injectable({
  providedIn: 'root'
})
export class BankService {
  private deleteUrl = environment.APIBASEURL + 'Bank/InactiveBank/';
  private CreateUrl = environment.APIBASEURL + 'Bank/CreateBankAccount';
  private UpdateUrl = environment.APIBASEURL + 'Bank/UpdateBankAccount';

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


  bankList(InstituteId:number) {
    // return this.http.get<Bank[]>( environment.APIBASEURL + 'Bank/GetAll'+'/'+InstituteId, httpOptions)
    //   .pipe(map(bank => {
    //     return bank;
    //   }));


      return this.http.get(environment.APIBASEURL+ 'Bank/GetAll'+'/'+InstituteId,this.getAuthHeader()).pipe(map(data => data as Bank[]))
  }

  delete(ID): Observable<Bank> {

    return this.http.post<Bank>(this.deleteUrl + ID,null, this.getAuthHeader()).pipe(
      tap(_ => console.log(`deleted Bank id=${ID}`))
    );
  }

  bank(bank: Bank) {
    return this.http.post<Bank>(this.CreateUrl, bank, this.getAuthHeader()).pipe(map(bank => { return bank }))
  }


  editAccNo(bank): Observable<Bank> {

    return this.http.post<Bank>(this.UpdateUrl, bank, this.getAuthHeader()).pipe(
      tap((bank: Bank) => console.log('Update BankAccountId=${bank.BankAccountId}'))

    );
  }
}









