import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Recommended } from './recommended';
import { Observable } from 'rxjs';
import { APP_CONFIG, AppConfig } from '../app-config.interface';

@Injectable({
  providedIn: 'root'
})
export class RecommendedService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.apiUrl = `${config.apiEndpoint}/api/recommended`;
  }

  getRecommended(): Observable<Recommended[]> {
    return this.http.get(this.apiUrl).pipe(
      map((response: { data: Recommended[] }) => response.data)
    );
  }
}
