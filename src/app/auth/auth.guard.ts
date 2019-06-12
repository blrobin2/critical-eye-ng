import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  CanActivateChild,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot): Promise<boolean> | boolean {
    // The code woulc come from Spotify's login redirecting
    // after authentication with a code
    const code = next.queryParamMap.get('code');
    return this.checkLogin(code);
  }

  canActivateChild(next: ActivatedRouteSnapshot): Promise<boolean> | boolean {
    return this.canActivate(next);
  }

  private checkLogin(code?: string): Promise<boolean> | boolean {
    // If we already have a token, we're good
    if (this.authService.getToken()) {
      return true;
    }

    // If we got a code from the Spotify, we can use that
    // to get a token
    if (code) {
      return this.authService.spotifyCallback(code);
    }

    // Otherwise, login time
    this.router.navigate(['/login']);
    return false;
  }
}
