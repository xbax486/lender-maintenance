import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Lender } from './../../models/lender';

import { LenderService } from './../../services/lender.service';
import { ErrorHandleService } from './../../services/error-handle.service';

@Component({
  selector: 'app-lender-maintenance',
  templateUrl: './lender-maintenance.component.html',
  styleUrls: ['./lender-maintenance.component.css'],
})
export class LenderMaintenanceComponent implements OnInit, OnDestroy {
  lenders: Lender[] = [];

  lenderStartLoaded: boolean = false;
  lenderLoadedSucceed: boolean = false;

  fetchLendersSubscription: Subscription = new Subscription();
  hanldeErrorsSubscription: Subscription = new Subscription();

  constructor(
    private lenderService: LenderService,
    private errorHandleService: ErrorHandleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.hanleLendersLoaded();
    this.lenders = this.lenderService.getLenders();
    if (this.lenders.length === 0) {
      this.fetchLenders();
    } else {
      this.uploadLoadingStatusFlags(false, true);
    }
  }

  ngOnDestroy() {
    this.fetchLendersSubscription.unsubscribe();
    this.hanldeErrorsSubscription.unsubscribe();
  }

  public fetchLenders() {
    this.lenderStartLoaded = true;
    this.lenderService.fetchLenders();
  }

  public hanleLendersLoaded() {
    this.fetchLendersSubscription = this.lenderService.lenders$.subscribe(
      (lenders: Lender[]) => {
        if (lenders && lenders.length > 0) {
          this.lenders = lenders;
          this.uploadLoadingStatusFlags(false, true);
        }
      }
    );

    this.subscribeToGlobalErrorHanlder();
  }

  public onEditClicked(lender: Lender) {
    this.lenderService.selectedLender$.next(lender);
    this.router.navigate(['/lender', this.lenders.indexOf(lender)]);
  }

  private uploadLoadingStatusFlags(
    lenderStartLoaded: boolean,
    lenderLoadedSucceed: boolean
  ) {
    this.lenderStartLoaded = lenderStartLoaded;
    this.lenderLoadedSucceed = lenderLoadedSucceed;
  }

  private subscribeToGlobalErrorHanlder() {
    this.hanldeErrorsSubscription =
      this.errorHandleService.errorOccurSubject.subscribe((error) => {
        if (error) {
          this.uploadLoadingStatusFlags(false, false);
        }
      });
  }
}
