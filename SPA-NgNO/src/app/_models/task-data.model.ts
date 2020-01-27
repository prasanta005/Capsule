import { UserData } from '../_models/user-data.model';
export interface TaskData {
    TaskID: number;
      UserID: number;
        ProjectID: number;
    TaskName: string;
    ParentID: number;
    ParentName: string;
    StartDate: string;
    EndDate: string;
    Priority: number;
    ParentTaskName:string;
    IsCompleted:boolean;   
      users?: UserData[] 
}