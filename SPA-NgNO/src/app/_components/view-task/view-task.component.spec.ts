import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';
import { ViewTaskComponent } from './view-task.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
 import { RouterTestingModule } from '@angular/router/testing';
 import { DatePipe } from '@angular/common';
 import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
 import { ProjectService } from 'src/app/_services/project.service';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaskComponent ],
       imports: [
             FormsModule ,HttpClientTestingModule,HttpClientModule ,RouterTestingModule    //<----------make sure you have added this.
                        ],
            providers:[ DatePipe],
              schemas: [ CUSTOM_ELEMENTS_SCHEMA ]            
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });
});
