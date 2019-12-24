import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { NavComponent } from './_components/nav/nav.component';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './_components/add-task/add-task.component';
import { ViewTaskComponent } from './_components/view-task/view-task.component'
import {DatePipe} from '@angular/common';
import { TestviewComponent } from './_components/testview/testview/testview.component';
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddUserComponent } from './_components/add-user/add-user.component';
import { AddProjectComponent } from './_components/add-project/add-project.component'; // <-- import the module

const routes: Routes = [

  { path: '', component: ViewTaskComponent },
  { path: 'ViewTask', component: ViewTaskComponent },
  { path: 'AddTask', component: AddTaskComponent },
  { path: 'EditTask/:id', component: AddTaskComponent },
  { path: 'testTask', component: TestviewComponent },
   { path: 'AddUser', component: AddUserComponent },
    { path: 'AddProject', component: AddProjectComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AddTaskComponent,
    ViewTaskComponent,
    TestviewComponent,
    AddUserComponent,
    AddProjectComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    Ng2SearchPipeModule ,
     Ng2OrderModule, //add here
     NgxPaginationModule
  ],
  providers: [ DatePipe],
  bootstrap: [AppComponent],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
   ,
   exports:[NavComponent]
})
export class AppModule { }
