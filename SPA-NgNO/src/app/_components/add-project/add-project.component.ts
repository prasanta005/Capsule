import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../../_services/project.service';
import { TaskService } from './../../_services/task.service';
import { UserService } from './../../_services/user.service';
import { FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { ViewTaskComponent } from '../../_components/view-task/view-task.component'
import { TaskData } from './../../_models/task-data.model';
import { ProjectData } from './../../_models/project-data.model';
import { UserData } from './../../_models/user-data.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  
  // User Data
 key: string = 'name'; //set default
 reverse: boolean = false;
   userData: UserData = {FirstName:'',UserID: null,LastName:'',EmployeeID:'' }
users: UserData[];
  //
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  updateprojreq: ProjectData;
  projects: ProjectData[];
  isEdit: boolean;
  projectId: number;
  projectData: ProjectData = {     ProjectID: null,
    UserID: null,
    TaskID: null,
    ProjectName:  '',
    StartDate: '',
    EndDate: '',
     Priority: null}
  FormRequestType: string="";

  constructor(private datePipe: DatePipe,private projectService: ProjectService,private userService: UserService, private router: Router) { }

  
  ngOnInit() {
    this.FormRequestType="Add";
    this.projectService.getProjects()
      .subscribe(response => {
        this.projects = response;
        console.log( this.projects)
      })
 this.userService.getUsers()
      .subscribe(
        (userresponse: UserData[]) => {
          this.users = userresponse;
           console.log("users response in consolee");
           console.log(this.users);
        }
      );
      
      
  }

  submit(form: FormGroup) {
    const request = form.value;

    if (!this.isEdit) {
      this.projectService.addProject(request)
        .subscribe(response => {
          this.projects.push(response);
        }, error => {
          for (const key of Object.keys(error.error.ModelState)) {
            for (const err of error.error.ModelState[key]) {
              alert(err);
            }
          }
        }, () => {
          form.reset();
         
        })
    } else {
     
     this.updateprojreq=request;
     this.updateprojreq.ProjectID=this.projectId;

       console.log("Inside update");
       console.log(this.updateprojreq);
      this.projectService.updateProject(this.projectId, this.updateprojreq)
        /* working
        .subscribe(project => {
          var projIndex = this.projects.findIndex(proj => proj.UserID == this.projectId);
          console.log("projIndex");
          console.log(projIndex);

          if (projIndex != -1) {
           this.projectService.getUsers()
      .subscribe(response => {
        this.projects = response;
        console.log( this.projects)
      })
          }
          */
          .subscribe(project => {
           this.projectService.getProjects()
      .subscribe(response => {
        this.projects = response;
         console.log( this.projects)
           this.FormRequestType="Submit";
      })
          }
        , error => {
          for (const key of Object.keys(error.error.ModelState)) {
            for (const err of error.error.ModelState[key]) {
              alert(err);
            }
          }
        }, () => {
          form.reset();
          this.isEdit = false;
        })
    }
  }

  delete(id: number) {
    let isDelete = confirm('Do you wish to delete the User?')
    if (isDelete) {
      this.projectService.deleteProject(id)
        .subscribe(response => {
          if (response) {
            const projIndex = this.projects.findIndex(proj => proj.UserID == id);
            if (projIndex != -1) {
              this.projects.splice(projIndex, 1);
            }
          }
        });
    }
  }

  edit(id: number) {
    console.log("id")
    console.log(id)
     this.FormRequestType="Update";
    console.log("edit id")
     console.log(id)
    this.projectService.getProject(id)
      .subscribe(project => {
        console.log(project)
        this.projectData.ProjectName = project.ProjectName; 
        this.projectData.Priority = project.Priority;
          this.projectData.StartDate = this.datePipe.transform(project.StartDate, "yyyy-MM-dd");
          this.projectData.EndDate = this.datePipe.transform(project.EndDate, "yyyy-MM-dd");
          this.projectData.UserID= project.UserID;
         this.isEdit = true;
        this.projectId = id;
      })
  }

}
