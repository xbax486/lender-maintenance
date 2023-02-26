import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { Modal } from 'bootstrap';

import { ILender } from 'src/app/models/lender';
import { IBank } from 'src/app/models/bank';
import { BankProperties } from 'src/app/enums/bank-properties';
import { LenderService } from 'src/app/services/lender.service';

@Component({
  selector: 'app-lender',
  templateUrl: './lender.component.html',
  styleUrls: ['./lender.component.css'],
})
export class LenderComponent implements OnInit, OnDestroy {
  selectedLender: ILender = {
    type: '',
    id: '',
    attributes: {
      code: '',
      name: '',
      type: '',
      upfont_commission: 0,
      high_trail_commission: 0,
      low_trail_commission: 0,
      balance_multiplier: 0,
      is_active: false,
      is_hidden: false,
    },
  };
  originalLender: ILender = {
    type: '',
    id: '',
    attributes: {
      code: '',
      name: '',
      type: '',
      upfont_commission: 0,
      high_trail_commission: 0,
      low_trail_commission: 0,
      balance_multiplier: 0,
      is_active: false,
      is_hidden: false,
    },
  };

  banks: IBank[] = [];
  types: string[] = [];

  bankProperties: BankProperties = 0;

  selectedLenderSubscription = new Subscription();

  constructor(private lenderService: LenderService, private router: Router) {}

  ngOnInit() {
    this.getSelectedLender();
  }

  ngOnDestroy() {
    this.selectedLenderSubscription.unsubscribe();
  }

  public getSelectedLender() {
    this.selectedLenderSubscription =
      this.lenderService.selectedLender$.subscribe((lender: ILender) => {
        this.selectedLender = _.cloneDeep(lender);
        this.originalLender = _.cloneDeep(lender);
        this.getBanksAndTypes();
      });
  }

  public onCancelClicked() {
    if (this.lenderIsChanged()) {
      let confirmModal = new Modal(
        document.getElementById('confirm-modal') as HTMLElement
      );
      confirmModal.show();
    } else {
      this.router.navigate(['']);
    }
  }

  public onSubmit() {
    if (this.lenderIsChanged()) {
      let lenders = this.lenderService.getLenders();
      let indexOfLender = lenders.findIndex(
        (lender: ILender) => lender.id === this.selectedLender.id
      );
      this.lenderService.updateLenders(indexOfLender, this.selectedLender);
    }
    this.router.navigate(['']);
  }

  public onBankChanged(property: BankProperties) {
    let index = 0;
    let updatedBank: IBank = { code: '', name: '' };
    if (property === 0) {
      index = this.banks.findIndex(
        (bank) => bank.code === this.selectedLender.attributes.code
      );
      updatedBank = { ...this.banks[index] };
      this.selectedLender.attributes.name = updatedBank.name;
    } else if (property === 1) {
      index = this.banks.findIndex(
        (bank) => bank.name === this.selectedLender.attributes.name
      );
      updatedBank = { ...this.banks[index] };
      this.selectedLender.attributes.code = updatedBank.code;
    }
  }

  private getBanksAndTypes() {
    this.banks = this.lenderService.getBanks();
    this.types = this.lenderService.getTypes();
  }

  private lenderIsChanged() {
    return !_.isEqual(this.selectedLender, this.originalLender);
  }
}
