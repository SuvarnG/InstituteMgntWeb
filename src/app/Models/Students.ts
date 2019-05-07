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
    PayingFees:boolean
}

export interface FeesTransaction{
    Id:number;
    CourseId:number;
    StudentId:number;
    DateOfPayment:Date;
    FeesPaid:number;
    FeesTakenBy:string;
    // CourseCompleted:boolean;
    // Discount:number;
    // TotalFees:number;
    // Remark:string;
    // IsActive:boolean;
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