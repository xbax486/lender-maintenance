import { Component, OnDestroy } from '@angular/core';
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
  lendersWithEdited: Lender[] = [];
  banks: Bank[] = [];
  types: string[] = [];

  lenderStartLoaded: boolean = false;
  lenderLoadedSucceed: boolean = false;

  fetchLendersSubscription: Subscription = new Subscription();
  fetchBanksSubscription: Subscription = new Subscription();
  fetchTypesSubscription: Subscription = new Subscription();
  hanldeErrorsSubscription: Subscription = new Subscription();

  constructor(
    private lenderService: LenderService,
    private toastService: ToastrService,
    private errorHandleService: ErrorHandleService
  ) {
    this.fetchLenders();
    this.fetchBanks();
    this.fetchTypes();
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
          this.enableEditMode();
        }
      });

    this.subscribeToGlobalErrorHanlder();
  }

  public toggleIsEdit(lender: Lender) {
    lender.isEditMode = !lender.isEditMode;
  }

  public onBankCodeChanged($event: Event, lender: Lender) {
    let value = ($event.target as HTMLInputElement).value;
    const index = this.banks.findIndex((bank) => bank.code === value);
    const updatedBank = { ...this.banks[index] };
    lender.attributes.name = updatedBank.name;
    lender.attributes.code = value;
  }

  public onBankNameChanged($event: Event, lender: Lender) {
    let value = ($event.target as HTMLInputElement).value;
    const index = this.banks.findIndex((bank) => bank.name === value);
    const updatedBank = { ...this.banks[index] };
    lender.attributes.code = updatedBank.code;
    lender.attributes.name = value;
  }

  public onUpfrontChanged($event: Event, lender: Lender) {
    let value = Number(($event.target as HTMLInputElement).value);
    if (value >= 0) {
      lender.attributes.upfont_commission = value;
    }
  }

  public onHighTrailChanged($event: Event, lender: Lender) {
    let value = Number(($event.target as HTMLInputElement).value);
    if (value >= 0) {
      lender.attributes.high_trail_commission = value;
    }
  }

  public onLowTrailChanged($event: Event, lender: Lender) {
    let value = Number(($event.target as HTMLInputElement).value);
    if (value >= 0) {
      lender.attributes.low_trail_commission = value;
    }
  }

  public onBalanceMultiplierChanged($event: Event, lender: Lender) {
    let value = Number(($event.target as HTMLInputElement).value);
    if (value >= 0) {
      lender.attributes.balance_multiplier = value;
    }
  }

  public onIsActiveChanged($event: Event, lender: Lender) {
    let checked = ($event.target as HTMLInputElement).checked;
    lender.attributes.is_active = checked;
  }

  public onIsHiddenChanged($event: Event, lender: Lender) {
    let checked = ($event.target as HTMLInputElement).checked;
    lender.attributes.is_hidden = checked;
  }

  private fetchBanks() {
    this.fetchBanksSubscription = this.lenderService
      .getLendersBanks()
      .subscribe((result: Bank[]) => {
        this.banks = result;
      });
  }

  private fetchTypes() {
    this.fetchTypesSubscription = this.lenderService
      .getLendersTypes()
      .subscribe((result: string[]) => {
        this.types = result;
      });
  }

  private enableEditMode() {
    this.lendersWithEdited = this.lenders.map((lender) => {
      return { ...lender, isEditMode: false };
    });
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
    if (this.fetchLendersSubscription) {
      this.fetchLendersSubscription.unsubscribe();
    }
    if (this.fetchBanksSubscription) {
      this.fetchBanksSubscription.unsubscribe();
    }
    if (this.fetchTypesSubscription) {
      this.fetchTypesSubscription.unsubscribe();
    }
    if (this.hanldeErrorsSubscription) {
      this.hanldeErrorsSubscription.unsubscribe();
    }
  }
}
