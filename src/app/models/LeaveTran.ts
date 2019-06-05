export interface LeaveTransaction {
    Id: number,
    StudentId: number,
    CourseId: number,
    FullName: string,
    //FirstName: string,
    //MiddleName: string,
    //LastName: string,
    LeaveType: string,
    Reason: string,
    Comment: string,
    //IsFollowupNeeded: boolean,
    NeedFollowupDate: Date,
    //Leave: string,
    FromDate: Date,
    ToDate: Date,
    
    //Gender: string
    
}

export interface LeaveType {
    LeaveId: Number;
    LeaveType: string;
}
