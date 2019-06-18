import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AuthModule } from '@app/auth/auth.module';
import { ReviewsModule } from '@app/reviews/reviews.module';
import { CoreModule } from '@app/core/core.module';
import { APP_CONFIG } from '@app/app-config.interface';
import { CRITICAL_EYE_CONFIG } from '@app/app.config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    ReviewsModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: CRITICAL_EYE_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
