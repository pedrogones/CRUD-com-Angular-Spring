import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Injectable({
  providedIn: 'root'
})

export class CourseResolver implements Resolve<Course> {

constructor(private service: CoursesService){

}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
   if(route.params && route.params['_id']){
   // console.log(route.params['_id']);
    return this.service.loadByID(route.params['_id']);
   }
    return of({_id: 0,name: '', category: '', aulas: ''});
  }


}
