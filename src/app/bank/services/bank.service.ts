import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bank } from 'shared/Model/Bank'
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Utils } from '../../Core/Utils';
import { BankTransaction } from 'shared/Model/BankTransaction';
import { StaffMaster } from 'shared/Model/StaffMaster';
import { BankNames } from 'shared/Model/BankNames';


@Injectable({
  providedIn: 'root'
})

export class BankService {

  public listStaff: StaffMaster[];
  public listaccno: BankTransaction[];
  public bankname: BankNames[];

  private deleteUrl = environment.APIBASEURL + 'Bank/InactiveBank/';
  private CreateUrl = environment.APIBASEURL + 'Bank/CreateBankAccount';
  private UpdateUrl = environment.APIBASEURL + 'Bank/UpdateBankAccount';

  constructor(private http: HttpClient) { }

  getbankAccountsList(InstituteId: number) {
    return this.http.get(environment.APIBASEURL + 'Bank/GetAll' + '/' + InstituteId, Utils.getAuthHeader()).pipe(map(data => data as Bank[]))
  }

  inactivateBankAccount(ID): Observable<Bank> {
    return this.http.post<Bank>(this.deleteUrl + ID, null, Utils.getAuthHeader()).pipe(
      tap(_ => console.log(`deleted Bank id=${ID}`))
    );
  }

  createBankAccount(bank: Bank) {
    return this.http.post<Bank>(this.CreateUrl, bank, Utils.getAuthHeader()).pipe(map(bank => { return bank }))
  }

  updateBankAccount(bank): Observable<Bank> {
    return this.http.post<Bank>(this.UpdateUrl, bank, Utils.getAuthHeader()).pipe(
      tap((bank: Bank) => console.log('Update BankAccountId=${bank.BankAccountId}'))
    );
  }

  getBankTransactionList(BranchId: number) {
    return this.http.get<BankTransaction[]>(environment.APIBASEURL + 'Bank/GetAllBankTrn' + '/' + BranchId, Utils.getAuthHeader())
      .pipe(map(banktransaction => {
        return banktransaction;
      }));
  }

  getAccountNumber(BankName) {
    return this.http.get(environment.APIBASEURL + 'Bank/GetAccoNo' + '/' + BankName, Utils.getAuthHeader()).pipe(map(data => data as BankTransaction[]))
  }

  createBankTransaction(banktransaction: BankTransaction) {
    return this.http.post<BankTransaction>(environment.APIBASEURL + 'Bank/CreateBankTrn', banktransaction, Utils.getAuthHeader()).pipe(map(banktransaction => { return banktransaction }))
  }

  updateBankTransaction(banktransaction): Observable<BankTransaction> {
    return this.http.post<BankTransaction>(environment.APIBASEURL + 'Bank/UpdateBankTrn', banktransaction, Utils.getAuthHeader()).pipe(
      tap((banktransaction: BankTransaction) => console.log('Update Id=${banktransaction.ID}'))
    );
  }
}









