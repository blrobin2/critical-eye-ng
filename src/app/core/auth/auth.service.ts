import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { buildQueryString } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login() {
    const params = buildQueryString({
      client_id: environment.spotifyClientId,
      response_type: 'code',
      redirect_uri: window.location.origin,
      scope: ['user-read-email', 'user-read-private'].join(' '),
      show_dialog: 'true'
    });
    window.location.replace(`https://accounts.spotify.com/authorize${params}`);
  }

  spotifyCallback(code: string) {
    return new Promise((resolve) => {
      this.http
        .get(`${environment.apiEndpoint}/auth/spotify/callback?code=${code}`)
        .subscribe(({ token }: { token: string}) => {
          this.setToken(token);
          resolve();
        });
    });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}
