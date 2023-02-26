import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ILender } from './../../models/lender';

import { LenderService } from './../../services/lender.service';
import { ErrorHandleService } from './../../services/error-handle.service';

@Component({
  selector: 'app-lender-maintenance',
  templateUrl: './lender-maintenance.component.html',
  styleUrls: ['./lender-maintenance.component.css'],
})
export class LenderMaintenanceComponent implements OnInit, OnDestroy {
  lenders: ILender[] = [];

  lenderStartLoaded: boolean = false;
  lenderLoadedSucceed: boolean = false;

  loadLendersSubscription: Subscription = new Subscription();
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
      this.loadLenders();
    } else {
      this.uploadLoadingStatusFlags(false, true);
    }
  }

  ngOnDestroy() {
    this.loadLendersSubscription.unsubscribe();
    this.hanldeErrorsSubscription.unsubscribe();
  }

  public loadLenders() {
    this.lenderStartLoaded = true;
    this.lenderService.loadLenders();
  }

  public retryToloadLenders() {
    this.lenderStartLoaded = true;
    this.lenderService.retryToloadLenders();
  }

  public hanleLendersLoaded() {
    this.loadLendersSubscription = this.lenderService.lenders$.subscribe(
      (lenders: ILender[]) => {
        if (lenders && lenders.length > 0) {
          this.lenders = lenders;
          this.uploadLoadingStatusFlags(false, true);
        }
      }
    );

    this.subscribeToGlobalErrorHanlder();
  }

  public onEditClicked(lender: ILender) {
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
