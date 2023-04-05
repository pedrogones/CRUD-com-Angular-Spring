import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { delay, first, Observable, of, tap } from 'rxjs';

import { Course } from './../model/course';


@Injectable({
  providedIn: 'root'
})

//@Component({templateUrl:'./courses.service.spec.ts'})
//@Component({templateUrl:'./courses.service.ts'})
export class CoursesService {

  private readonly API = 'api/courses';
  constructor(private httClient: HttpClient) {

  }

//logica que criei sem validação:


    save(record: Partial<Course>){
     if(record._id){
      console.log('update')
      return this.update(record)
     }
     console.log('create')
      return this.create(record)
    }
      /*
    upDate(record: Partial<Course>){
      console.log(record)
      return this.update(record)
      }
*/
  private create(record: Partial<Course>){
    return this.httClient.post<Course>(this.API, record)
  }

  private update(record: Partial<Course>){
    console.log(record._id)
    return this.httClient.put<Course>(`${this.API}/${record._id}`, record)
  }

  remove(_id: number){
    return this.httClient.delete(`${this.API}/${_id}`)
  }

  loadByID(_id: number){
   return this.httClient.get<Course>(`${this.API}/${_id}`)
  }
  list(){
      return  this.httClient.get<Course[]>(this.API)
      .pipe(
        first(),
       delay(1000),
        //tap(courses => console.log(2-(-2)))
      )
    }
}
