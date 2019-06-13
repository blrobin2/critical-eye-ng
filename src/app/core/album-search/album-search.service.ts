import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { buildQueryString } from '../../utils';
import { APP_CONFIG, AppConfig } from 'src/app/app-config.interface';

export interface AlbumSearchResult {
  spotifyId: string;
  artist: string;
  album: string;
  href: string;
  artwork: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlbumSearchService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
   this.baseUrl = `${config.apiEndpoint}/api/search`;
  }

  search(terms: Observable<string>) {
    return terms
      .pipe(
        switchMap(term => this.searchEntries(term))
      );
  }

  searchEntries(term: string) {
    return this.http.get(this.baseUrl + buildQueryString({ q: term }))
      .pipe(
        map((response: { data: { items: any[] } }) => {
          return response.data.items
            // Grab only the data we care about
            .map(album => ({
              spotifyId: album.id,
              artist: album.artists
                .map((artist: { name: string }) => artist.name)
                .join(', '),
              album: album.name,
              href: album.external_urls.spotify,
              artwork: album.images[0].url,
              yearReleased: new Date(album.release_date).getUTCFullYear(),
            }));
        }
      ));
  }
}
