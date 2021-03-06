import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { debounceTime, delay, switchMap, tap, map } from 'rxjs/operators';

import { Review } from '@app/reviews/review';
import { SortDirection } from '@app/core/sortable.directive';
import { APP_CONFIG, AppConfig } from '@app/app-config.interface';

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

  private apiUrl: string;

  private state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.apiUrl = `${config.apiEndpoint}/api/review`;
  }

  start() {
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
    return this;
  }

  getReview(_id: string): Observable<Review> {
    return this.http.get(`${this.apiUrl}/${_id}`).pipe(
      map((obj: { data: Review }) => {
        return obj.data;
      })
    );
  }

  saveReview(review: Review) {
    if (review._id === '') {
      return this.http.post(this.apiUrl, review).subscribe(() => {
        this._search$.next();
      });
    } else {
      return this.http.put(`${this.apiUrl}/${review._id}`, review).subscribe(() => {
        this._search$.next();
      });
    }
  }

  deleteReview(review: Review) {
    return this.http.delete(`${this.apiUrl}/${review._id}`).subscribe(() => {
      this._search$.next();
    });
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

    return this.http.get(this.apiUrl).pipe(
      switchMap(({ data }: { data: Review[] }) => {
        const reviews = sort(data, sortColumn, sortDirection)
        .filter(review => matches(review, searchTerm))
        .map(review => ({
          ...review,
          dateListened: new Date(review.dateListened)
        }));

        return of({
          reviews: reviews.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize),
          total: reviews.length
        });
      }));
  }

  private set(patch: Partial<State>) {
    Object.assign(this.state, patch);
    this._search$.next();
  }
}
