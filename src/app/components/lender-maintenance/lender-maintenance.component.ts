import { Component } from '@angular/core';
import { LenderService } from './../../services/lender.service';
import { Lender } from './../../models/lender';

@Component({
  selector: 'app-lender-maintenance',
  templateUrl: './lender-maintenance.component.html',
  styleUrls: ['./lender-maintenance.component.css']
})
export class LenderMaintenanceComponent {
  lenders: Lender[] = [];

  constructor(private lenderService: LenderService) {
    this.lenderService.getLenders().subscribe(lendersResult => {
      if(lendersResult && lendersResult.data) {
        this.lenders = lendersResult.data;
      }
    });
  }
}
