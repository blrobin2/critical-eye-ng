import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Recommended } from './recommended';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendedService {
  private apiUrl = `${environment.apiEndpoint}/api/recommended`;

  constructor(private http: HttpClient) { }

  getRecommended(): Observable<Recommended[]> {
    return this.http.get(this.apiUrl).pipe(
      map((response: { data: Recommended[] }) => response.data)
    );
  }
}
