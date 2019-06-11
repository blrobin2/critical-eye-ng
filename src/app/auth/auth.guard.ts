import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot): Promise<boolean> {
    return this.checkLogin(next);
  }

  private checkLogin(next: ActivatedRouteSnapshot): Promise<boolean> {
    if (this.authService.getToken()) {
      return Promise.resolve(true);
    }

    const code = next.queryParamMap.get('code');
    if (code) {
      return this.authService.spotifyCallback(code);
    }

    this.router.navigate(['/login']);
    return Promise.resolve(false);
  }
}
