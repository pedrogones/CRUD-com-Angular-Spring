import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';


@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
  export class CoursesFormComponent implements OnInit   {
    form = this.formBuilder.group({
      name: [''],
      category: [''],
      aulas: [''],
      _id: 0
    });


  constructor(private formBuilder: NonNullableFormBuilder,
     private service: CoursesService,
      private _snackBar: MatSnackBar,
      private location: Location,
      private route: ActivatedRoute){

  }
      ngOnInit(): void{

        const course: Course = this.route.snapshot.data['course'];
       // console.log(course._id)
        // consertar o erro da tipagem de String para string

        this.form.setValue({
          name: course.name,
          category: course.category,
          aulas: course.aulas,
          _id: course._id
        })

      }




      onSubmit(){

            this.service.save(this.form.value).subscribe(result => this.onSave(), error => this.onError())
                //  this.service.upDate(this.form.value).subscribe(result => this.onPut(), error => this.onErrorPut())
                //   this.service.verifyId(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T;
             }
/*
      //trecho que seria usado se n tivesse a validação do course service:
      onUpdate(){
        this.service.upDate(this.form.value).subscribe(result => this.onPut(), error => this.onErrorPut())
       }
*/
      private onSave(){
        this._snackBar.open('Curso salvo com sucesso', '', {duration: 4000})
        this.onCancel();
      }

      private onPut(){
        this._snackBar.open('Atualizção salva com sucesso', '', {duration: 4000})
        this.onCancel();
      }
      onCancel(){
        this.location.back();
      }

      private onErrorPut(){
        this._snackBar.open('Erro ao atualizar Curso', '', {duration: 4000})
      }
      private onError(){
        this._snackBar.open('Erro ao salvar Curso', '', {duration: 4000})
      }
}
