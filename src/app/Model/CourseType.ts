

export interface CourseType{
    CourseTypeId: number,
    CourseTypeName:string
    
}

export interface Course{
    CourseId:number,
    CourseTypeId: number,
    ShortName:string,
    FullName:string,
    IsPercentage:boolean,
    Fees:number,
    Duration:Date,
    //IsActive:boolean,
    Percentage:number,
   // CourseTypeName:string
   BranchId:number,
   InstituteId:number

    
}