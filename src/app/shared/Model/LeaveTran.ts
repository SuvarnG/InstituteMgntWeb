export interface LeaveTransaction {
    Id: number,
    StudentId: number,
    CourseId: number,
    FullName: string,
    LeaveType: string,
    Reason: string,
    Comment: string,
    NeedFollowupDate: Date,
    FromDate: Date,
    ToDate: Date,
    TotalDays: number
}

export interface LeaveType {
    LeaveId: Number;
    LeaveType: string;
}
