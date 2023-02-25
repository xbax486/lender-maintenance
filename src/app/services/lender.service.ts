import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, tap, BehaviorSubject } from 'rxjs';

import { LenderJsonResult } from '../models/lender';
import { Lender, Bank } from './../models/lender';

const TIME_TO_FETCH_DATA = 2000;

@Injectable({
  providedIn: 'root',
})
export class LenderService {
  private _jsonURL = 'assets/lenders.json';

  public lenders: Lender[] = [];
  public banks: Bank[] = [];
  public types: string[] = [];

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

  constructor(private http: HttpClient) {}

  public getLenders(): void {
    this.http
      .get<LenderJsonResult>(this._jsonURL)
      .pipe(
        delay(TIME_TO_FETCH_DATA),
        tap((lenderJsonResult: LenderJsonResult) => {
          this.lenders = lenderJsonResult.data;
          this.lenders$.next([...this.lenders]);
        })
      )
      .subscribe();
  }

  public getLendersBanks(): Bank[] {
    if (this.banks.length === 0 && this.lenders.length > 0) {
      this.lenders.map((lender: Lender) => {
        this.banks.push({
          code: lender.attributes.code,
          name: lender.attributes.name,
        });
        this.banks = [
          ...new Map(this.banks.map((bank) => [bank['code'], bank])).values(),
        ];
      });
    }
    return this.banks;
  }

  public getLendersTypes() {
    if (this.types.length === 0 && this.lenders.length > 0) {
      this.lenders.map((lender: Lender) => {
        if (!this.types.includes(lender.attributes.type)) {
          this.types.push(lender.attributes.type);
        }
      });
    }
    return this.types;
  }
}
