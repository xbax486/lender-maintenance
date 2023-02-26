import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';

import { InterceptorService } from './services/interceptor.service';

import { AppComponent } from './app.component';
import { LenderMaintenanceComponent } from './components/lender-maintenance/lender-maintenance.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LenderComponent } from './components/lender/lender.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LenderMaintenanceComponent,
    LoadingSpinnerComponent,
    LenderComponent,
    ConfirmModalComponent,
    EllipsisPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
