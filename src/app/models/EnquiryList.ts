export interface EnquiryList{
    ID:Number;
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
    Remark:string,
    Course:string;
    }

export interface CourseTypeMaster
{
CourseTypeID:Number,
CourseTypeName:string
}

export interface CourseNameMaster{
    CourseID:Number,
    Course:string
}