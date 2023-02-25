import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Lender, Bank } from './../../models/lender';

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

  fetchLendersSubscription: Subscription = new Subscription();
  hanldeErrorsSubscription: Subscription = new Subscription();

  constructor(
    private lenderService: LenderService,
    private toastService: ToastrService,
    private errorHandleService: ErrorHandleService,
    private router: Router
  ) {
    this.fetchLenders();
  }

  ngOnDestroy(): void {
    this.clearAllSubscriptions();
  }

  public fetchLenders() {
    this.lenderStartLoaded = true;

    this.clearAllSubscriptions();
    this.fetchLendersSubscription = this.lenderService
      .getLenders()
      .subscribe((lendersResult) => {
        if (lendersResult && lendersResult.data) {
          this.lenders = lendersResult.data;
          this.uploadLoadingStatusFlags(false, true);
          this.sendToastMessageWhenDataIsLoaded();
        }
      });

    this.subscribeToGlobalErrorHanlder();
  }

  public onEditClicked(lender: Lender) {
    this.lenderService.selectedLender$.next(lender);
    this.router.navigate(['/lender', lender.id]);
  }

  private uploadLoadingStatusFlags(
    lenderStartLoaded: boolean,
    lenderLoadedSucceed: boolean
  ) {
    this.lenderStartLoaded = lenderStartLoaded;
    this.lenderLoadedSucceed = lenderLoadedSucceed;
  }

  private sendToastMessageWhenDataIsLoaded() {
    this.toastService.success('Lenders are fetched successfully!', 'Success');
  }

  private subscribeToGlobalErrorHanlder() {
    this.hanldeErrorsSubscription =
      this.errorHandleService.errorOccurSubject.subscribe((error) => {
        if (error) {
          this.uploadLoadingStatusFlags(false, false);
        }
      });
  }

  private clearAllSubscriptions() {
    this.fetchLendersSubscription.unsubscribe();
    this.hanldeErrorsSubscription.unsubscribe();
  }
}
