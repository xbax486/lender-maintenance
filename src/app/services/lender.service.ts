import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, switchMap, of } from 'rxjs';

import { LenderJsonResult } from '../models/lender';
import { Lender, Bank } from './../models/lender';

const TIME_TO_FETCH_DATA = 3000;

@Injectable({
  providedIn: 'root',
})
export class LenderService {
  private _jsonURL = 'assets/lenders.json';

  constructor(private http: HttpClient) {}

  public getLenders(): Observable<LenderJsonResult> {
    return this.http
      .get<LenderJsonResult>(this._jsonURL)
      .pipe(delay(TIME_TO_FETCH_DATA));
  }

  public getLendersBanks() {
    let banks: Bank[] = [];
    return this.getLenders().pipe(
      switchMap((lendersResult: LenderJsonResult) => {
        if (lendersResult && lendersResult.data) {
          lendersResult.data.map((lender: Lender) => {
            const bank: Bank = {
              code: lender.attributes.code,
              name: lender.attributes.name,
            };
            banks.push(bank);
            banks = [
              ...new Map(
                banks.map((bankItem) => [bankItem['code'], bankItem])
              ).values(),
            ];
          });
        }
        return of(banks);
      })
    );
  }

  public getLendersTypes() {
    let types: string[] = [];
    return this.getLenders().pipe(
      switchMap((lendersResult: LenderJsonResult) => {
        if (lendersResult && lendersResult.data) {
          lendersResult.data.map((lender: Lender) => {
            if (!types.includes(lender.attributes.type)) {
              types.push(lender.attributes.type);
            }
          });
        }
        return of(types);
      })
    );
  }
}
