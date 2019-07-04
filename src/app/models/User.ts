export interface User {
        Id: Number,
        FirstName: string,
        LastName: string,
        Email: string,
        Password: string,
        // Contact: number,
        RoleId: number,
        Role: string,
        CreatedDate: Date,
        CreatedBy: number,
        UpdatedDate: Date,
        UpdatedBy: Number,
        IsActive: boolean,
        access_token: string,
        Photo:string,
        BranchId:number,
        InstituteId:number
}

