import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
  switch(value){
    case 'Front-End': return 'code';
  //(caso seja inserido de outra forma)  case 'front-End': return 'code';
  //(caso seja inserido de outra forma) case 'back-End' : return 'terminal';
    case 'Back-End' : return 'terminal';
    case'Full-Stack': return 'dynamic_form';
    case 'Language': return 'token';
  }
 return 'dataset';
  }

}
