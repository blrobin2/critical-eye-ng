import { Injectable } from '@angular/core';
import { Alert } from '@app/core/alert/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alerts: Alert[] = [];

  constructor() {
    window.addEventListener('error', (event) => {
      this.alerts.push({
        type: 'danger',
        message: event.message
      });
    });
  }

  addAlert(alert: Alert) {
    this.alerts.push(alert);
  }
}
