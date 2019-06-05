import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes('login')) {
      return next.handle(req);
    }
    return this.handleAccess(req, next);
  }

  private handleAccess(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.auth.getToken();
    const headerSettings: { [name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.get(key);
    }
    if (token) {
      headerSettings.Authorization = `Bearer ${token}`;
    }
    headerSettings['Content-Type'] = 'application/json';
    const changedRequest = request.clone({
      setHeaders: headerSettings
    });
    return next.handle(changedRequest);
  }
}
