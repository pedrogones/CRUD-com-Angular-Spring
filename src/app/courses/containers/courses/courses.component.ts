import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of, pipe } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit{


  courses$: Observable<Course[]> | undefined;

 // CoursesService: CoursesService;

constructor(private CoursesService: CoursesService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar){
//this.CoursesService = new CoursesService();
this.refresh();
}
refresh(){
  this.courses$ = this.CoursesService.list()
 .pipe(
  catchError(error =>{
    this.onError("Erro ao carregar o curso")
    return of([]);
  })
 );
}
onError(errorMsg: String) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
  ngOnInit(): void {
   // throw new Error('Method not implemented.');
  }
  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(course: Course){
    this.router.navigate(['edit', course._id], {relativeTo: this.route});
  }

  onDelete(course: Course){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza q deseja remover o curos?',
    });

    dialogRef.afterClosed().subscribe((result:Boolean) => {
     if(result){

   this.CoursesService.remove(course._id).subscribe(
    ()=>{
      this.refresh();
      this.snackBar.open('Curso removido com sucesso!', 'close', {duration: 4000, verticalPosition:'top', horizontalPosition: 'center'})
    },
     ()=>this.onError("Error ao tentar salvar curso!")
    )
     }
    });
  }
}

