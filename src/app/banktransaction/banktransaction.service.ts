import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BankTransaction } from '../shared/Model/BankTransaction';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StaffMaster } from '../shared/Model/StaffMaster';
import { Observable } from 'rxjs';
import { BankNames } from '../shared/Model/BankNames';
import { Accountnumbers } from '../shared/Model/AccountNumber';
import { Utils } from '../Utils';



@Injectable({
  providedIn: 'root'
})
export class BanktransactionService {
  private CreateUrl = environment.APIBASEURL + 'Bank/CreateBankTrn';
  private UpdateUrl = environment.APIBASEURL + 'Bank/UpdateBankTrn';

  public listStaff: StaffMaster[];
  public listaccno: BankTransaction[];
  public bankname: BankNames[];

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

  banktransactionList(BranchId:number) {
    return this.http.get<BankTransaction[]>(environment.APIBASEURL + 'Bank/GetAllBankTrn'+'/'+BranchId, this.getAuthHeader())
      .pipe(map(banktransaction => {
        return banktransaction;
      }));
  }


  getAccountNumber(BankName) {
    return this.http.get(environment.APIBASEURL + 'Bank/GetAccoNo'+'/' + BankName,this.getAuthHeader()).pipe(map(data => data as BankTransaction[]))

  }

  banktransaction(banktransaction: BankTransaction) {

    return this.http.post<BankTransaction>(this.CreateUrl, banktransaction, this.getAuthHeader()).pipe(map(banktransaction => { return banktransaction }))
  }


  edit(banktransaction): Observable<BankTransaction> {

    return this.http.post<BankTransaction>(this.UpdateUrl, banktransaction, this.getAuthHeader()).pipe(
      tap((banktransaction: BankTransaction) => console.log('Update Id=${banktransaction.ID}'))

    );
  }

}



