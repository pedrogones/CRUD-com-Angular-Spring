import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
 @Input() courses : Course[]=[];
 @Output() add = new EventEmitter(false);
 @Output() edit = new EventEmitter(false);
 @Output() delete = new EventEmitter(false);
 readonly displayedColumns = ['name', 'category', '_id', 'aulas', 'actions'];

  constructor(){

  }
  ngOnInit(){

  }
  onAdd(): void {
    this.add.emit(true);
   }
   onEdit(course: Course){
    this.edit.emit(course);
    let bo: boolean
    bo = true
   }

   onDelete(course: Course){
    this.delete.emit(course)
   }
}
