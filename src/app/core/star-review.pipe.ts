import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starReview'
})
export class StarReviewPipe implements PipeTransform {
  transform(value: number): any {
    const wholes = Math.floor(value);
    const [, remainder] = (value % 1).toString().split('.');
    const wholeRating = '★'.repeat(wholes);
    const remainderRating = remainder ? `.${remainder}` : '';
    return wholeRating + remainderRating;
  }
}
