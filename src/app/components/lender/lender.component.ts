import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Lender, Bank } from 'src/app/models/lender';
import { BankProperties } from 'src/app/models/bankPropertiesEnum';
import { LenderService } from 'src/app/services/lender.service';

@Component({
  selector: 'app-lender',
  templateUrl: './lender.component.html',
  styleUrls: ['./lender.component.css'],
})
export class LenderComponent implements OnDestroy {
  selectedLender: Lender = {
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

  banks: Bank[] = [];
  types: string[] = [];

  bankProperties: BankProperties = 0;

  selectedLenderSubscription = new Subscription();

  constructor(private router: Router, private lenderService: LenderService) {
    this.getSelectedLender();
  }

  ngOnDestroy(): void {
    this.selectedLenderSubscription.unsubscribe();
  }

  onCancelClicked() {
    this.router.navigate(['']);
  }

  public onBankChanged(property: BankProperties) {
    let index = 0;
    let updatedBank: Bank = { code: '', name: '' };
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

    console.log(this.selectedLender);
  }

  private getSelectedLender() {
    this.selectedLenderSubscription =
      this.lenderService.selectedLender$.subscribe((lender: Lender) => {
        this.selectedLender = lender;
        this.getBanks();
        this.getTypes();
      });
  }

  private getBanks() {
    this.banks = this.lenderService.getLendersBanks();
  }

  private getTypes() {
    this.types = this.lenderService.getLendersTypes();
  }
}
