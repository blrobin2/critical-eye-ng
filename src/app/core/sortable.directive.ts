import {
  Directive,
  Input,
  HostBinding,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = {
  asc: 'desc',
  desc: '',
  '': 'asc'
};

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[appSortable]'
})
export class SortableDirective {
  @Input() appSortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  @HostBinding('class.asc') get asc() {
    return this.direction === 'asc';
  }
  @HostBinding('class.desc') get desc() {
    return this.direction === 'desc';
  }
  @HostListener('click') rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({
      column: this.appSortable,
      direction: this.direction
    });
  }
}
