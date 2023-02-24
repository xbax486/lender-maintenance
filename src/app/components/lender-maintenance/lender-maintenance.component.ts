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
  lendersInTable: Lender[] = [];
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
    this.clearAllSubscriptions();

    this.lenderStartLoaded = true;

    this.fetchLendersSubscription = this.lenderService
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
          this.addEditMode();
        }
      });

    this.hanldeErrorsSubscription =
      this.errorHandleService.errorOccurSubject.subscribe((error) => {
        if (error) {
          this.lenderStartLoaded = false;
          this.lenderLoadedSucceed = false;
        }
      });
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

  private addEditMode() {
    this.lendersInTable = this.lenders.map((lender) => {
      return { ...lender, isEditMode: false };
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
