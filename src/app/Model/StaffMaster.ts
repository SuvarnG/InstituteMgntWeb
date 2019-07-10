export interface StaffMaster {
    StaffId:Number	
    FirstName:String
    MiddleName:String
    LastName:String
    Email:String
    BloodGroup:String
    Gender:String
    Photo:String
    DOB:Date
    DOJ:Date
    DOL:Date
    LeavingReason:String
    Address1:String
    //Address2:String
    City:String
    State:String
    STDCode:Number
    ContactNo:Number
    P_Address1:String
   // P_Address2:String
    P_City:String
    P_State:String	
    P_STDCode:Number
   // P_ContactNo:Number
    EmergencyNo:Number
    PreviousExperience:number
    PreviousWorkName:String
    IsCv:Boolean
    IsFixedPayment:Number
    IsActive:Boolean
    CourseTypeId:number
    CourseId:number
    CourseTypeName:string
    CourseName:string
    StaffName:string
    BranchId:number
    InstituteId:number
    Salary:number
}

export interface TeacherCourse{
    TeacherID:number
    CourseTypeId:number
    CourseId:number
    Salary:number
}
