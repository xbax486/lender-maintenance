import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LenderMaintenanceComponent } from './components/lender-maintenance/lender-maintenance.component';

@NgModule({
  declarations: [
    AppComponent,
    LenderMaintenanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
