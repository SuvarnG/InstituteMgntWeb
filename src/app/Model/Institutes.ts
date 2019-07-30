export interface Institutes{
    Id:number;
    InstituteName:string;
    Address:string;
    Owner:string;
    Contact:string;
    Email:string;
    CreatedDate:Date;
    CreatedBy:number;
    UpdatedDate:Date;
    UpdatedBy:number;
    IsActive:Boolean
}

export interface InstituteAdmins{
    Id:number;
    InstituteId:number;
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
}