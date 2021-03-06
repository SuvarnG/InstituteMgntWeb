export interface Students{
    StudentId:number;
    FullName:string;
    Course:string;
    DateOfJoining:Date;
    ContactNo:string;
    Duration:number;
    CourseCompleted:boolean;
    FeesPaid:number;
    RemainingFees:number;
    Discount:number;
    Remark:string;
    CourseCompletedDate:Date;

    FirstName:string;
    MiddleName:string;
    LastName:string;
    Address1:string;
    Address2:string;
    City:string;
    State:string;
    STDCode:string;
    PAddress1:string;
    PAddress2:string;
    PCity:string;
    PState:string;
    PSTDCode:string;
    Gender:string;
    EmailId:string;
    BloodGroup:string;
    DOB:Date;
    EmergencyNo:string;
    IsDocumentSubmitted:boolean;
    Photo:string;
    Document:string;
}

export interface UpdateStudent{
    StudentId:number;
    FirstName:string;
    MiddleName:string;
    LastName:string;
    Address1:string;
    City:string;
    State:string;
    STDCode:string;
    PAddress1:string;
    PCity:string;
    PState:string;
    PSTDCode:string;
    Gender:string;
    EmailId:string;
    BloodGroup:string;
    DOB:Date;
    EmergencyNo:string;
    IsDocumentSubmitted:boolean;
    ContactNo:string;
    Course:string;
    CourseType:string;
    CourseTypeId:number;
    CourseId:number;
}

export interface CreateStudent{
    ContactNo:string;
    FirstName:string;
    MiddleName:string;
    LastName:string;
    Address1:string;
    City:string;
    State:string;
    STDCode:string;
    PAddress1:string;
    PCity:string;
    PState:string;
    PSTDCode:string;
    Gender:string;
    EmailId:string;
    BloodGroup:string;
    DOB:Date;
    EmergencyNo:string;
    IsDocumentSubmitted:boolean;
    //PayingFees:boolean;
    Photo:string;
    Document:string;
}

export interface FeesTransaction{
    Id:number;
    CourseId:number;
    StudentId:number;
    CourseFees:number;
    DateOfPayment:Date;
    FeesPaid:number;
    PendingFees:number;
    FeesTakenBy:string;
    CourseCompleted:boolean;
    Discount:number;
    NewDiscountedAmount:number;
    TotalFees:number;
    Remark:string;
    IsActive:boolean;
    BranchId:number;
    InstituteId:number;
}

export interface FeesTransactions{
    Id:number;
    CourseId:number;
    StudentId:number;
    DateOfPayment:Date;
    FeesPaid:number;
    FeesTakenBy:string;
    PendingFees:number;
}

export interface User{

    Id:number;
    FirstName:string;
    LastName:string;
    Email:string;
    Password:string;
    RoleId:number;
    CreatedBy:number;

}
export interface CourseType{
    CourseTypeName:string;
    CourseTypeId:number;
}

export interface Courses{
    CourseId:number;
    CourseName:string;
    Fees:number;
    Percentage:number;
}

export interface CourseFees{
    CourseId:number;
    Fees:number;
    TotalFees:number;
}

export interface Users{
    Id:number;
    FirstName:string;
    LastName:string;
}

export interface Roles{
    roleID:number;
    RoleName:string;
}

export interface RecentStudent{
    StudentId:number;
    FirstName:string;
    LastName:string;
    EmailId:string;
}

export interface ThumbnailUrl{
    Message:string;
}

export interface FeesReportInput{
    BranchId:number;
    CourseId:number;
    FromDate:Date;
    ToDate:Date;
}

export interface FeesReport{
    StudentName:string;
    BranchName:string;
    CourseName:string;
    TotalFees:number;
    PendingFees:number;
    Discount:number;
    DateOfPayment:Date;
    FeesPaid:number;
}

export interface StudentReportInput{
    BranchId:number;
    CourseId:number;
    FromDate:Date;
    ToDate:Date;
}

export interface StudentReport{
    StudentName:string;
    BranchName:string;
    CourseName:string;
    TotalFees:number;
    PendingFees:number;
    City:string;
    EmailId:string;
    DateOfJoining:Date;
    Address:string;
    Gender:string;
}
