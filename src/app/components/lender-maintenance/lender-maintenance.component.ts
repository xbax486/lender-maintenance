import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Lender, LenderJsonResult } from './../../models/lender';

import { LenderService } from './../../services/lender.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandleService } from './../../services/error-handle.service';

@Component({
  selector: 'app-lender-maintenance',
  templateUrl: './lender-maintenance.component.html',
  styleUrls: ['./lender-maintenance.component.css'],
})
export class LenderMaintenanceComponent implements OnDestroy {
  lenders: Lender[] = [];
  lenderStartLoaded: boolean = false;
  lenderLoadedSucceed: boolean = false;

  lendersFetchSubscription: Subscription = new Subscription();
  errorHanldeSubscription: Subscription = new Subscription();

  constructor(
    private lenderService: LenderService,
    private toastService: ToastrService,
    private errorHandleService: ErrorHandleService
  ) {
    this.fetchLenders();
  }

  ngOnDestroy(): void {
    this.lendersFetchSubscription.unsubscribe();
    this.errorHanldeSubscription.unsubscribe();
  }

  public fetchLenders() {
    if (this.lendersFetchSubscription) {
      this.lendersFetchSubscription.unsubscribe();
    }
    if (this.errorHanldeSubscription) {
      this.errorHanldeSubscription.unsubscribe();
    }

    this.lenderStartLoaded = true;

    this.lendersFetchSubscription = this.lenderService
      .getLenders()
      .subscribe((lendersResult) => {
        if (lendersResult && lendersResult.data) {
          this.lenders = lendersResult.data;
          this.lenderStartLoaded = false;
          this.lenderLoadedSucceed = true;
          this.toastService.success(
            'Lenders are fetched successfully!',
            'Success'
          );
        }
      });

    this.errorHanldeSubscription =
      this.errorHandleService.errorOccurSubject.subscribe((error) => {
        if (error) {
          this.lenderStartLoaded = false;
          this.lenderLoadedSucceed = false;
        }
      });
  }
}
