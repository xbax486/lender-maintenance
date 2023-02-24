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
  hanldeErrorsSubscription: Subscription = new Subscription();

  constructor(
    private lenderService: LenderService,
    private toastService: ToastrService,
    private errorHandleService: ErrorHandleService
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
          this.enableEditMode();
          this.fetchBanks();
          this.fetchTypes();
        }
      });

    this.subscribeToGlobalErrorHanlder();
  }

  public toggleIsEdit(lender: Lender) {
    lender.isEditMode = !lender.isEditMode;
  }

  public onBankChanged($event: Event, lender: Lender, property: string) {
    let value = ($event.target as HTMLInputElement).value;
    let index, updatedBank;
    switch (property) {
      case 'code':
        index = this.banks.findIndex((bank) => bank.code === value);
        updatedBank = { ...this.banks[index] };
        lender.attributes.name = updatedBank.name;
        lender.attributes.code = value;
        break;
      case 'name':
        index = this.banks.findIndex((bank) => bank.name === value);
        updatedBank = { ...this.banks[index] };
        lender.attributes.code = updatedBank.code;
        lender.attributes.name = value;
        break;
      default:
        break;
    }
  }

  public onNumberChanged($event: Event, lender: Lender, property: string) {
    let target = $event.target as HTMLInputElement;
    let value = Number(target.value);
    value = value < 0 ? 0 : value > 100 ? 100 : value;
    if (value >= 0) {
      switch (property) {
        case 'upfont_commission':
          lender.attributes.upfont_commission = value;
          break;
        case 'high_trail_commission':
          lender.attributes.high_trail_commission = value;
          break;
        case 'low_trail_commission':
          lender.attributes.low_trail_commission = value;
          break;
        case 'balance_multiplier':
          lender.attributes.balance_multiplier = value;
          break;
        default:
          break;
      }
    }
  }

  public onCheckboxChanged($event: Event, lender: Lender, property: string) {
    let target = $event.target as HTMLInputElement;
    let checked = target.checked;
    switch (property) {
      case 'is_active':
        lender.attributes.is_active = checked;
        break;
      case 'is_hidden':
        lender.attributes.is_hidden = checked;
        break;
      default:
        break;
    }
  }

  private fetchBanks() {
    this.banks = this.lenderService.getLendersBanks();
  }

  private fetchTypes() {
    this.types = this.lenderService.getLendersTypes();
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
    if (this.hanldeErrorsSubscription) {
      this.hanldeErrorsSubscription.unsubscribe();
    }
  }
}
