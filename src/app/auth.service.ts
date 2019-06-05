import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  popup;

  constructor(private http: HttpClient) { }

  login() {
    const options = {
      client_id: '11057fc682c64532bb8541e9c5574f88',
      response_type: 'token',
      redirect_uri: 'http://localhost:4200',
      scope: ['user-read-email', 'user-read-private'].join(' '),
      show_dialog: 'true'
    };
    const params = new URLSearchParams();
    Object.entries(options).forEach(([key, value]) => {
      params.set(key, value);
    });
    window.location.replace(`https://accounts.spotify.com/authorize?${params.toString()}`);
  }

  spotifyCallback(fragment) {
    return new Promise((resolve) => {
      this.http
        .get(`${environment.apiEndpoint}/auth/spotify/callback?${fragment}`)
        .subscribe(({ token }: { token: string}) => {
          this.setToken(token);
          resolve();
        });
    });
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    location.reload();
  }
}
