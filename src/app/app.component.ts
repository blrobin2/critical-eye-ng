import { Component } from '@angular/core';
import { AlertService } from './core/alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'critical-eye-ng';

  constructor(private alertService: AlertService) {}

  get alerts() {
    return this.alertService.alerts;
  }
}
