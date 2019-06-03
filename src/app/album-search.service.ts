import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

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
  baseUrl = '';
  queryUrl = '?q=';

  constructor(private http: HttpClient) { }

  search(terms: Observable<string>) {
    return terms
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(term => this.searchEntries(term))
      );
  }

  searchEntries(term) {
    // return this.http.get(this.baseUrl + this.queryUrl + term);
    return of([
      {
        album_type: 'album',
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/0LcJLqbBmaGUft1e9Mm8HV'
            },
            href: 'https://api.spotify.com/v1/artists/0LcJLqbBmaGUft1e9Mm8HV',
            id: '0LcJLqbBmaGUft1e9Mm8HV',
            name: 'ABBA',
            type: 'artist',
            uri: 'spotify:artist:0LcJLqbBmaGUft1e9Mm8HV'
          }
        ],
        available_markets: [
          'CA',
          'MX',
          'US'
        ],
        external_urls: {
          spotify: 'https://open.spotify.com/album/1M4anG49aEs4YimBdj96Oy'
        },
        href: 'https://api.spotify.com/v1/albums/1M4anG49aEs4YimBdj96Oy',
        id: '1M4anG49aEs4YimBdj96Oy',
        images: [
          {
            height: 575,
            url: 'https://i.scdn.co/image/361387b8f4297afda0394896aeb1f315b3fbad0b',
            width: 640
          },
          {
            height: 270,
            url: 'https://i.scdn.co/image/803de302874cdff3ecbd531ecfd7585793c6b7c1',
            width: 300
          },
          {
            height: 57,
            url: 'https://i.scdn.co/image/c43883a6978668e0636d96887cf43ddbb6b5965d',
            width: 63
          }
        ],
        name: 'Arrival',
        release_date: '1976',
        release_date_precision: 'year',
        total_tracks: 12,
        type: 'album',
        uri: 'spotify:album:1M4anG49aEs4YimBdj96Oy'
      },
      {
        album_type: 'album',
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/0LcJLqbBmaGUft1e9Mm8HV'
            },
            href: 'https://api.spotify.com/v1/artists/0LcJLqbBmaGUft1e9Mm8HV',
            id: '0LcJLqbBmaGUft1e9Mm8HV',
            name: 'ABBA',
            type: 'artist',
            uri: 'spotify:artist:0LcJLqbBmaGUft1e9Mm8HV'
          }
        ],
        available_markets: [
          'CA',
          'MX',
          'US'
        ],
        external_urls: {
          spotify: 'https://open.spotify.com/album/1M4anG49aEs4YimBdj96Oy'
        },
        href: 'https://api.spotify.com/v1/albums/1M4anG49aEs4YimBdj96Oy',
        id: '1M4anG49aEs4YimBdj96Oy',
        images: [
          {
            height: 575,
            url: 'https://i.scdn.co/image/361387b8f4297afda0394896aeb1f315b3fbad0b',
            width: 640
          },
          {
            height: 270,
            url: 'https://i.scdn.co/image/803de302874cdff3ecbd531ecfd7585793c6b7c1',
            width: 300
          },
          {
            height: 57,
            url: 'https://i.scdn.co/image/c43883a6978668e0636d96887cf43ddbb6b5965d',
            width: 63
          }
        ],
        name: 'Arrival',
        release_date: '1976',
        release_date_precision: 'year',
        total_tracks: 12,
        type: 'album',
        uri: 'spotify:album:1M4anG49aEs4YimBdj96Oy'
      },
      {
        album_type: 'album',
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/0LcJLqbBmaGUft1e9Mm8HV'
            },
            href: 'https://api.spotify.com/v1/artists/0LcJLqbBmaGUft1e9Mm8HV',
            id: '0LcJLqbBmaGUft1e9Mm8HV',
            name: 'ABBA',
            type: 'artist',
            uri: 'spotify:artist:0LcJLqbBmaGUft1e9Mm8HV'
          }
        ],
        available_markets: [
          'CA',
          'MX',
          'US'
        ],
        external_urls: {
          spotify: 'https://open.spotify.com/album/1M4anG49aEs4YimBdj96Oy'
        },
        href: 'https://api.spotify.com/v1/albums/1M4anG49aEs4YimBdj96Oy',
        id: '1M4anG49aEs4YimBdj96Oy',
        images: [
          {
            height: 575,
            url: 'https://i.scdn.co/image/361387b8f4297afda0394896aeb1f315b3fbad0b',
            width: 640
          },
          {
            height: 270,
            url: 'https://i.scdn.co/image/803de302874cdff3ecbd531ecfd7585793c6b7c1',
            width: 300
          },
          {
            height: 57,
            url: 'https://i.scdn.co/image/c43883a6978668e0636d96887cf43ddbb6b5965d',
            width: 63
          }
        ],
        name: 'Arrival',
        release_date: '1976',
        release_date_precision: 'year',
        total_tracks: 12,
        type: 'album',
        uri: 'spotify:album:1M4anG49aEs4YimBdj96Oy'
      },
            {
        album_type: 'album',
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/0LcJLqbBmaGUft1e9Mm8HV'
            },
            href: 'https://api.spotify.com/v1/artists/0LcJLqbBmaGUft1e9Mm8HV',
            id: '0LcJLqbBmaGUft1e9Mm8HV',
            name: 'ABBA',
            type: 'artist',
            uri: 'spotify:artist:0LcJLqbBmaGUft1e9Mm8HV'
          }
        ],
        available_markets: [
          'CA',
          'MX',
          'US'
        ],
        external_urls: {
          spotify: 'https://open.spotify.com/album/1M4anG49aEs4YimBdj96Oy'
        },
        href: 'https://api.spotify.com/v1/albums/1M4anG49aEs4YimBdj96Oy',
        id: '1M4anG49aEs4YimBdj96Oy',
        images: [
          {
            height: 575,
            url: 'https://i.scdn.co/image/361387b8f4297afda0394896aeb1f315b3fbad0b',
            width: 640
          },
          {
            height: 270,
            url: 'https://i.scdn.co/image/803de302874cdff3ecbd531ecfd7585793c6b7c1',
            width: 300
          },
          {
            height: 57,
            url: 'https://i.scdn.co/image/c43883a6978668e0636d96887cf43ddbb6b5965d',
            width: 63
          }
        ],
        name: 'Arrival',
        release_date: '1976',
        release_date_precision: 'year',
        total_tracks: 12,
        type: 'album',
        uri: 'spotify:album:1M4anG49aEs4YimBdj96Oy'
      }
    ]).pipe(
      map(albums => {
        return albums.map(album => ({
          spotifyId: album.id,
          artist: album.artists.map(artist => artist.name).join(','),
          album: album.name,
          href: album.external_urls.spotify,
          artwork: album.images[0].url
        }));
      }
    ));
  }
}
