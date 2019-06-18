import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recommended } from '@app/recommended/recommended';
import { APP_CONFIG, AppConfig } from '@app/app-config.interface';

interface RecommendedApi {
  artist: string;
  album: string;
  date: string;
  link?: string;
  artwork?: string;
}

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
      map((response: { data: RecommendedApi[] }) =>
        response.data.map(rec => ({
          ...rec,
          href: rec.link
        }))
      )
    );
  }
}
