export interface User {
    Id: Number,
    FirstName:string,
    LastName:string,
    Email:string,
    RoleId:Number,
    Password:string
  
}export interface Resetpassword{
    Id: Number,
    Email:string
}

export interface User {
    Id: Number,
    FirstName: string,
    LastName: string,
    Email: string,
    Password: string,
    Contact: number,
    RoleId: Number,
    Role: string,
    CreatedDate: Date,
    CreatedBy: number,
    UpdatedDate: Date,
    UpdatedBy: Number,
    IsActive: boolean,
    access_token: string,
    Photo:string,
    BranchId:number,
    InstituteId:number,
    Address:string
}

