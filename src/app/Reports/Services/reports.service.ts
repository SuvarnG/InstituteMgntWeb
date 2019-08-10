import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ExpenseReportList } from 'shared/Model/Expenses'
import { Utils } from '../../Core/Utils';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { FeesReport, StudentReport } from 'shared/Model/Students'
import { EnquiryReport } from 'shared/Model/EnquiryList';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  
  constructor(private httpClient: HttpClient) { }

  pullExpenseReport(body) {
    return this.httpClient.post<ExpenseReportList[]>(environment.APIBASEURL + 'Expenses/GetExpenseReport', body, Utils.getAuthHeader())
  }

  pullFeesCollectionReport(body) {
    return this.httpClient.post<FeesReport[]>(environment.APIBASEURL + 'Student/GetFeesCollectionReport', body, Utils.getAuthHeader());
  }

  pullStudentAdmissionReport(body) {
    return this.httpClient.post<StudentReport[]>(environment.APIBASEURL + 'Student/GetStudentAdmissionReport', body, Utils.getAuthHeader());
  }

  pullEnquiryReport(body) {
    return this.httpClient.post<EnquiryReport[]>(environment.APIBASEURL + 'Enquiry/GetEnquiryReport', body, Utils.getAuthHeader());
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_Report_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  
}
