 
 export interface createEnquiry{ 
    ID: Number,
    FirstName: string,
    MiddleName: string,
    LastName: string,
    Address: string,
    City: string,
    CourseTypeId: number,
    DateOfEnquiry:Date,
    //IsFollowupNeeded:Number,
    NeedFollowupDate: Date,
    Remark:string,
    //CourseName:string,
    CourseId:Number
    
}

export interface CourseTypeMaster
{
CourseTypeID:Number,
CourseTypeName:string
}

export interface CourseNameMaster{
    CourseID:Number,
    CourseName:string
}