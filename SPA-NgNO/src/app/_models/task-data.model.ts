export interface TaskData {
    TaskID: number;
    TaskName: string;
    ParentID: number;
    StartDate: string;
    EndDate: string;
    Priority: number;
    ParentTaskName:string;
    IsCompleted:boolean;    
}