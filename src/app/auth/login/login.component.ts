import { Component } from '@angular/core';

import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
