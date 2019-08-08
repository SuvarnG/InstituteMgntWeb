export interface Branch{
BranchId:Number
BranchName:string
Address:string
ContactNo:number
InstituteId:number
}

export interface BranchManager{
    Id:number;
    InstituteId:number;
    BranchName:string;
    BranchId:number;
    FirstName:string;
    MiddleName:string;
    LastName:string;
    Gender:string;
    Address:string;
    Contact:string;
    Email:string;
    CreatedDate:Date;
    UpdatedDate:Date;
    UpdatedBy:number;
    IsActive:boolean;
    Photo:string;
    InstituteName:string;
}