import { Component, OnInit, NgProbeToken } from '@angular/core';
import { ProjectService } from 'src/app/_services/project.service';
import { Form, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskData } from './../../_models/task-data.model';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from './../../_services/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})

export class ViewTaskComponent implements OnInit {
  tasks: TaskData[];
    key: string = 'name'; //set default
  reverse: boolean = false;

  isEdit: boolean;
   rerender = false;  

  constructor(private route: ActivatedRoute,private taskService: TaskService,private projectService: ProjectService, private router: Router) { 
    
  }
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  
  ngOnInit() {
     let TaskID: number = +this.route.snapshot.params['id'];
    this.taskService.getTasks()
      .subscribe(
      (response: TaskData[]) => {
        this.tasks = response;
        console.log("task response in consolee");
        console.log(this.tasks);
      }
      );
  }

  

  edit(TaskID: number) {
    //this.router.navigate(['/projects', id]);
    this.router.navigate(['/EditTask',TaskID]);
  }

   delete(TaskID: number) {
   let isDelete = confirm('Do you wish to delete the Task?')

    if (isDelete) {
      this.taskService.deleteTask(TaskID)
        .subscribe(project => {
           this.taskService.getTasks()
      .subscribe(response => {
         this.tasks = response;
        //console.log( this.projects)
      })
          }
        );
          
    }
    
  }

}
