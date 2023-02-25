import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, tap, BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { LenderJsonResult } from '../models/lender';
import { Lender, Bank } from './../models/lender';

const TIME_TO_FETCH_DATA = 3000;

@Injectable({
  providedIn: 'root',
})
export class LenderService {
  private _jsonURL = 'assets/lenders.json';
  private _lenders: Lender[] = [];
  private _originalLenders: Lender[] = [];
  private _banks: Bank[] = [];
  private _types: string[] = [];

  public lenders$ = new BehaviorSubject<Lender[]>([]);
  public selectedLender$ = new BehaviorSubject<Lender>({
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
  });

  constructor(private http: HttpClient, private toastService: ToastrService) {}

  public fetchLenders() {
    this.http
      .get<LenderJsonResult>(this._jsonURL)
      .pipe(
        delay(TIME_TO_FETCH_DATA),
        tap((lenderJsonResult: LenderJsonResult) => {
          this._lenders = lenderJsonResult.data;
          this.updateOriginalLenders();
          this.lenders$.next(this._lenders);
          this.showSuccessNotification();
        })
      )
      .subscribe();
  }

  public getLenders(): Lender[] {
    return this._lenders;
  }

  public updateOriginalLenders() {
    this._originalLenders = JSON.parse(JSON.stringify(this._lenders));
  }

  public resetToOriginalLenders() {
    this._lenders = JSON.parse(JSON.stringify(this._originalLenders));
  }

  public getBanks(): Bank[] {
    if (this._lenders.length > 0 && this._banks.length === 0) {
      this._lenders.map((lender: Lender) => {
        this._banks.push({
          code: lender.attributes.code,
          name: lender.attributes.name,
        });
        this._banks = [
          ...new Map(this._banks.map((bank) => [bank['code'], bank])).values(),
        ];
      });
    }
    return this._banks;
  }

  public getTypes(): string[] {
    if (this._lenders.length > 0 && this._types.length === 0) {
      this._lenders.map((lender: Lender) => {
        if (!this._types.includes(lender.attributes.type)) {
          this._types.push(lender.attributes.type);
        }
      });
    }
    return this._types;
  }

  public banksAndTypesLoaded(): boolean {
    return this.getBanks().length > 0 && this.getTypes().length > 0;
  }

  private showSuccessNotification() {
    this.toastService.success('Lenders are fetched successfully!', 'Success');
  }
}
