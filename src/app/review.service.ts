import { Injectable } from '@angular/core';
import { Review } from './review';
import { REVIEWS } from './reviews';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import { SortDirection } from './sortable.directive';

interface SearchResult {
  reviews: Review[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(a: any, b: any): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function sort(reviews: Review[], column: string, direction: SortDirection): Review[] {
  if (direction === '') {
    return reviews;
  }
  return [...reviews].sort((a, b) => {
    const res = compare(a[column], b[column]);
    return direction === 'asc' ? res : -res;
  });
}

function matches(review: Review, term: string): boolean {
  return Object.values(review)
    .some(val =>
      String(val).toLowerCase().includes(term.toLowerCase()));
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _reviews$ = new BehaviorSubject<Review[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor() {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this.search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._reviews$.next(result.reviews);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get reviews$() {
    return this._reviews$.asObservable();
  }

  get total$() {
    return this._total$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get page() {
    return this.state.page;
  }

  set page(page: number) {
    this.set({ page });
  }

  get pageSize() {
    return this.state.pageSize;
  }

  set pageSize(pageSize: number) {
    this.set({ pageSize });
  }

  get searchTerm() {
    return this.state.searchTerm;
  }

  set searchTerm(searchTerm: string) {
    this.set({ searchTerm });
  }

  set sortColumn(sortColumn: string) {
    this.set({ sortColumn });
  }

  set sortDirection(sortDirection: SortDirection) {
    this.set({ sortDirection });
  }

  private search(): Observable<SearchResult> {
    const {
      sortColumn,
      sortDirection,
      pageSize,
      page,
      searchTerm
    } = this.state;

    const reviews = sort(REVIEWS, sortColumn, sortDirection)
      .filter(review => matches(review, searchTerm));
    return of({
      reviews: reviews.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize),
      total: reviews.length
    });
  }

  private set(patch: Partial<State>) {
    Object.assign(this.state, patch);
    this._search$.next();
  }
}