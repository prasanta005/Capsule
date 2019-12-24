import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../../_services/project.service';
import { TaskService } from './../../_services/task.service';
import { FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { ViewTaskComponent } from '../../_components/view-task/view-task.component'
import { TaskData } from './../../_models/task-data.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {

  // Task Model Sample
  task: TaskData = {
    TaskID: null,
    TaskName: '',
    ParentID: null,
    StartDate: '',
    EndDate: '',
    Priority: null,
    ParentTaskName: '',
    IsCompleted: false
  }
  test: TaskData;

  // Array of Task Model Sample
  tasks: TaskData[];

  //Additional
  isEdit: boolean;
  FormRequestType: string;
  param_tsk_id: number;
  constructor(private projectService: ProjectService,private taskService: TaskService, private router: Router, private datePipe: DatePipe, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("Verifying if URL contains params");
    this.param_tsk_id = +this.route.snapshot.params['id'];

    if (this.param_tsk_id) {
      console.log("param_tsk_id");
      console.log(this.param_tsk_id);
      this.isEdit = true;
      this.task.TaskID = this.param_tsk_id;
    }
    
    if (!this.isEdit) {
      this.FormRequestType = "Add";
    } else {
      this.FormRequestType = "Update";

      this.taskService.getTask(this.param_tsk_id)
        .subscribe(taskresp => {
          this.task.TaskID = taskresp[0].TaskID;
          this.task.TaskName = taskresp[0].TaskName;
          this.task.Priority = taskresp[0].Priority;
          this.task.ParentID= taskresp[0].ParentID;
          this.task.StartDate = this.datePipe.transform(taskresp[0].StartDate, "yyyy-MM-dd");
          this.task.EndDate =  this.datePipe.transform(taskresp[0].EndDate, "yyyy-MM-dd");    
         
 
          //this.isEdit = true;
 
          console.log("this.task");
          console.log( taskresp[0]);
        })        
    }


    this.taskService.getTasks()
      .subscribe(
        (response: TaskData[]) => {
          this.tasks = response;
          // console.log("project response in consolee");
          // console.log(this.tasks);
        }
      );
  }

  TaskID(){
    return this.task.ParentID;
  }
  submit(form: FormGroup) {
    const request = form.value;
    /* request.StartDate = this.datePipe.transform(request.StartDate, "dd-MM-yyyy");
    request.EndDate = this.datePipe.transform(request.EndDate, "dd-MM-yyyy");
*/
 
    console.log("form value from   submit(form: FormGroup)");
    console.log(request);
    if (!this.isEdit) {
      ;
      this.taskService.addTask(request)
        .subscribe(response => {
          this.tasks.push(response);
        }, error => {
          for (const key of Object.keys(error.error.ModelState)) {
            for (const err of error.error.ModelState[key]) {
              alert(err);
            }
          }
        }, () => {
          form.reset();
        })
    }else {
      this.test = form.value;
      this.test.TaskID = this.param_tsk_id;
      this.taskService.updateTask(this.param_tsk_id, request)
        .subscribe(responses => {this.taskService.getTasks()
      .subscribe(
      (response: TaskData[]) => {
        this.tasks = response;
        console.log("task response in consolee");
        console.log(this.tasks);
      },
          error => {
            for (const key of Object.keys(error.error.ModelState)) {
              for (const err of error.error.ModelState[key]) {
                alert(err);
              }
            }
          },
          () => {
            form.reset();
            this.isEdit = false;
          })
           this.router.navigate(['/ViewTask']);
        })
    }
  }
}