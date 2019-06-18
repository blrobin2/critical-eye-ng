import { Component } from '@angular/core';
import { AlertService } from '@app/core/alert/alert.service';
import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'critical-eye-ng';

  constructor(
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  get alerts() {
    return this.alertService.alerts;
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }
}
