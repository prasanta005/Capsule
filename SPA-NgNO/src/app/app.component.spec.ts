import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
 import { RouterTestingModule } from '@angular/router/testing';
 import { DatePipe } from '@angular/common';
 import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
 import { ProjectService } from 'src/app/_services/project.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
      FormsModule ,HttpClientTestingModule,HttpClientModule ,RouterTestingModule    //<----------make sure you have added this.
      ],
      providers:[ DatePipe] ,
        schemas: [ CUSTOM_ELEMENTS_SCHEMA ]  
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'TaskManager'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('TaskManager');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Task Manager');
  });
  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });  
});
