import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../../_services/project.service';
import { FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { ViewTaskComponent } from '../../_components/view-task/view-task.component'
import { TaskData } from './../../_models/task-data.model';
import { UserData } from './../../_models/user-data.model';
import { DatePipe } from '@angular/common';
import { UserService } from './../../_services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  updateuserreq: UserData;
  users: UserData[];
  isEdit: boolean;
  userId: number;
  userData: UserData = {FirstName:'',UserID: null,LastName:'',EmployeeID:'' }
  FormRequestType: string="";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.FormRequestType="Add";
    this.userService.getUsers()
      .subscribe(response => {
        this.users = response;
        console.log( this.users)
      })
  }

  submit(form: FormGroup) {
    const request = form.value;

    if (!this.isEdit) {
      this.userService.addUser(request)
        .subscribe(response => {
          this.users.push(response);
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
     
     this.updateuserreq=request;
     this.updateuserreq.UserID=this.userId;

       console.log("Inside update");
       console.log(this.updateuserreq);
      this.userService.updateUser(this.userId, this.updateuserreq)
        /* working
        .subscribe(project => {
          var projIndex = this.projects.findIndex(proj => proj.UserID == this.projectId);
          console.log("projIndex");
          console.log(projIndex);

          if (projIndex != -1) {
           this.userService.getUsers()
      .subscribe(response => {
        this.projects = response;
        console.log( this.projects)
      })
          }
          */
          .subscribe(project => {
           this.userService.getUsers()
      .subscribe(response => {
        this.users = response;
         console.log( this.users)
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
      this.userService.deleteUser(id)
        .subscribe(response => {
          if (response) {
            const projIndex = this.users.findIndex(proj => proj.UserID == id);
            if (projIndex != -1) {
              console.log("spliced")
              this.users.splice(projIndex, 1);
            }
          }
        });
    }
  }

  edit(id: number) {
     this.FormRequestType="Update";
    console.log("edit id")
     console.log(id)
    this.userService.getUser(id)
      .subscribe(user => {
        this.userData.FirstName = user.FirstName;
        this.userData.LastName = user.LastName;
         this.userData.EmployeeID = user.EmployeeID;
        this.isEdit = true;
        this.userId = id;
      })
  }

}
