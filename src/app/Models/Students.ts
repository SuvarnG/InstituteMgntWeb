export interface Students{
    StudentId:number,
    FullName:string,
    Course:string,
    DateOfJoining:Date,
    ContactNo:string,
    Duration:number,
    CourseCompleted:boolean,
    FeesPaid:number,
    RemainingFees:number,
    Discount:number,
    Remark:string,
    CourseCompletedDate:Date;

    FirstName:string,
    MiddleName:string,
    LastName:string,
    Address1:string,
    Address2:string,
    City:string,
    State:string,
    STDCode:string,
    PAddress1:string,
    PAddress2:string,
    PCity:string,
    PState:string,
    PSTDCode:string,
    Gender:string,
    EmailId:string,
    BloodGroup:string,
    DOB:Date,
    EmergencyNo:string,
    IsDocumentSubmitted:boolean
}

export interface UpdateStudent{
    StudentId:number,
    FirstName:string,
    MiddleName:string,
    LastName:string,
    Address1:string,
    Address2:string,
    City:string,
    State:string,
    STDCode:string,
    PAddress1:string,
    PAddress2:string,
    PCity:string,
    PState:string,
    PSTDCode:string,
    Gender:string,
    EmailId:string,
    BloodGroup:string,
    DOB:Date,
    EmergencyNo:string,
    IsDocumentSubmitted:boolean
    //DateOfJoining:Date,
    ContactNo:string,
}

export interface CreateStudent{
    // StudentId:number,

   
    ContactNo:string,

    FirstName:string,
    MiddleName:string,
    LastName:string,
    Address1:string,
    Address2:string,
    City:string,
    State:string,
    STDCode:string,
    PAddress1:string,
    PAddress2:string,
    PCity:string,
    PState:string,
    PSTDCode:string,
    Gender:string,
    EmailId:string,
    BloodGroup:string,
    DOB:Date,
    EmergencyNo:string,
    IsDocumentSubmitted:boolean,
    PayingFees:boolean,
    Photo:string
    //PayingFees:string
}

export interface FeesTransaction{
    Id:number;
    CourseId:number;
    StudentId:number;
    CourseFees:number;
    DateOfPayment:Date;
    FeesPaid:number;
    FeesTakenBy:string;
    CourseCompleted:boolean;
    Discount:number;
    NewDiscountedAmount:number;
    TotalFees:number;
    Remark:string;
    IsActive:boolean;
}

export interface FeesTransactions{
    Id:number;
    CourseId:number;
    StudentId:number;
    //CourseFees:number;
    DateOfPayment:Date;
    FeesPaid:number;
    FeesTakenBy:string;
}

export interface User{

    Id:number;
   // StudentId:number;
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
}

export interface CourseFees{
    CourseId:number;
    Fees:number;
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