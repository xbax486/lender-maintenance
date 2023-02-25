import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LenderComponent } from './components/lender/lender.component';
import { LenderMaintenanceComponent } from './components/lender-maintenance/lender-maintenance.component';

import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'lender/:index',
    component: LenderComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    component: LenderMaintenanceComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuardService],
  exports: [RouterModule],
})
export class AppRoutingModule {}
