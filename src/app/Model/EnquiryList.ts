export interface EnquiryList{
    ID:Number;
    CourseTypeId: Number,
    FirstName: string,
    MiddleName: string,
    LastName: string,
    Address: string,
    City: string,
    CourseTypeName: string,
    DateOfEnquiry:Date,
    IsFollowupNeeded:Number,
    NeedFollowupDate: Date,
    Remark:string,
    Course:string;
    BranchId:number;
    CourseId:number;
    }

export interface CourseTypeMaster
{
CourseTypeID:Number,
CourseTypeName:string
}

export interface CourseNameMaster{
    CourseID:Number,
    Course:string
}

export interface EnquiryReportInput{
    BranchId:number;
    CourseId:number;
    FromDate:Date;
    ToDate:Date;
}

export interface EnquiryReport{
    EnquirerName:string;
    BranchName:string;
    CourseName:string;
    Address:string;
    City:string;
    DateOfEnquiry:Date;
}