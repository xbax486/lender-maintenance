import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, tap, BehaviorSubject } from 'rxjs';

import { LenderJsonResult } from '../models/lender';
import { Lender, Bank } from './../models/lender';

const TIME_TO_FETCH_DATA = 2000;

@Injectable({
  providedIn: 'root',
})
export class LenderService {
  private _jsonURL = 'assets/lenders.json';
  private _lenders: Lender[] = [];
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

  public getLenders(): Observable<LenderJsonResult> {
    return this.http.get<LenderJsonResult>(this._jsonURL).pipe(
      delay(TIME_TO_FETCH_DATA),
      tap((lenderJsonResult: LenderJsonResult) => {
        this._lenders = lenderJsonResult.data;
      })
    );
  }

  public getLendersBanks(): Bank[] {
    let banks: Bank[] = [];
    if (this._lenders.length > 0) {
      this._lenders.map((lender: Lender) => {
        banks.push({
          code: lender.attributes.code,
          name: lender.attributes.name,
        });
        banks = [
          ...new Map(banks.map((bank) => [bank['code'], bank])).values(),
        ];
      });
    }
    return banks;
  }

  public getLendersTypes() {
    let types: string[] = [];
    if (this._lenders.length > 0) {
      this._lenders.map((lender: Lender) => {
        if (!types.includes(lender.attributes.type)) {
          types.push(lender.attributes.type);
        }
      });
    }
    return types;
  }
}
