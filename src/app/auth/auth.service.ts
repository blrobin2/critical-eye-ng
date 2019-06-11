import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { buildQueryString } from 'src/app/utils';
import { AlertService } from '../core/alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private alertService: AlertService) { }

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

  spotifyCallback(code: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.http
        .get(`${environment.apiEndpoint}/auth/spotify/callback?code=${code}`)
        .subscribe(({ token }: { token: string}) => {
          this.setToken(token);
          this.alertService.addAlert({
            type: 'success',
            message: 'Successfully logged in'
          });
          resolve(true);
        });
    });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  get isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.alertService.addAlert({
      type: 'info',
      message: 'Successfully logged out'
    });
  }
}
