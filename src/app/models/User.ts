export interface User {
        Id: Number,
        FirstName: string,
        LastName: string,
        Email: string,
        Password: string,
        // Contact: number,
        RoleId: number,
        CreatedDate: Date,
        CreatedBy: number,
        UpdatedDate: Date,
        UpdatedBy: Number,
        IsActive: boolean
}