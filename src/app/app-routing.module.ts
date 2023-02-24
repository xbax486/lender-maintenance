import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LenderComponent } from './components/lender/lender.component';
import { LenderMaintenanceComponent } from './components/lender-maintenance/lender-maintenance.component';

const routes: Routes = [
  {
    path: 'lender/:id',
    component: LenderComponent,
  },
  {
    path: '',
    component: LenderMaintenanceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
