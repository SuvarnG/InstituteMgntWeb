export interface EnquiryList{
    CourseTypeId: Number,
    FirstName: string,
    MiddleName: string,
    LastName: string,
    Address: string,
    City: string,
    CourseTypeName: string,
    DateOfEnquiry:Date,
    IsFollowupNeeded:Number,
    NeedFollowupDate: Date,
    Remark:string
    
    
}

export interface CourseTypeMaster
{
CourseTypeID:Number,
CourseTypeName:string
}

export interface CourseTypeMaster{
    CourseID:Number,
    CourseName:string
}