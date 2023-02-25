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
  private _lenders: Lender[] = [];
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

  constructor(private http: HttpClient) {}

  public fetchLenders(): void {
    this.http
      .get<LenderJsonResult>(this._jsonURL)
      .pipe(
        delay(TIME_TO_FETCH_DATA),
        tap((lenderJsonResult: LenderJsonResult) => {
          this._lenders = lenderJsonResult.data;
          this.lenders$.next([...this._lenders]);
        })
      )
      .subscribe();
  }

  public getLenders(): Lender[] {
    return [...this._lenders];
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
    return [...this._banks];
  }

  public getTypes(): string[] {
    if (this._lenders.length > 0 && this._types.length === 0) {
      this._lenders.map((lender: Lender) => {
        if (!this._types.includes(lender.attributes.type)) {
          this._types.push(lender.attributes.type);
        }
      });
    }
    return [...this._types];
  }

  public banksAndTypesLoaded(): boolean {
    return this.getBanks().length > 0 && this.getTypes().length > 0;
  }
}
