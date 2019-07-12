import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {ExpenseMaster,ExpenseReport,ExpenseReportList} from '../Model/Expenses'
import { Utils } from '../Utils';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


const httpOptions={
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
                            'Authorization': `Bearer ${Utils.GetAccessToken()}` })
} 

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExpenseReportService {

  constructor(private httpClient:HttpClient) { }

  pullExpenseReport(body){
      return this.httpClient.post<ExpenseReportList[]>(environment.APIBASEURL+'Expenses/GetExpenseReport',body,httpOptions)
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    //const workbook = self.spread.get
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
    private saveAsExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
      FileSaver.saveAs(data, fileName + '_Report_' + new  Date().getTime() + EXCEL_EXTENSION);
    }
}
