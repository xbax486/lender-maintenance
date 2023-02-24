import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, switchMap, of, tap } from 'rxjs';

import { LenderJsonResult } from '../models/lender';
import { Lender, Bank } from './../models/lender';

const TIME_TO_FETCH_DATA = 3000;

@Injectable({
  providedIn: 'root',
})
export class LenderService {
  private _jsonURL = 'assets/lenders.json';
  private _lenders: Lender[] = [];

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
