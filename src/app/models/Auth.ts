export interface Auth {
    username: string;
    password: string;
    grant_type:string;
    userId:number;
    friendlyName:string;
    lastLogin:Date;
    roles:string;
    access_token: string;
}