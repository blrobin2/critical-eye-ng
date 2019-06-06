import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { buildQueryString } from '../../utils';

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
  baseUrl = `${environment.apiEndpoint}/api/search`;

  constructor(private http: HttpClient) { }

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
                .join(','),
              album: album.name,
              href: album.external_urls.spotify,
              artwork: album.images[0].url,
              yearReleased: new Date(album.release_date).getUTCFullYear(),
            }));
        }
      ));
  }
}
