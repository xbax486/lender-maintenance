import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, tap, BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ILender } from './../models/lender';
import { IBank } from './../models/bank';
import { ILenderJsonResult } from './../models/lender-json-result';

const TIME_TO_FETCH_DATA = 3000;

@Injectable({
  providedIn: 'root',
})
export class LenderService {
  private _jsonURL = 'assets/lenders.json';
  private _lenders: ILender[] = [];
  private _originalLenders: ILender[] = [];
  private _banks: IBank[] = [];
  private _types: string[] = [];

  public lenders$ = new BehaviorSubject<ILender[]>([]);
  public selectedLender$ = new BehaviorSubject<ILender>({
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
      .get<ILenderJsonResult>(this._jsonURL)
      .pipe(
        delay(TIME_TO_FETCH_DATA),
        tap((lenderJsonResult: ILenderJsonResult) => {
          this._lenders = lenderJsonResult.data;
          this.updateOriginalLenders();
          this.lenders$.next(this._lenders);
          this.showSuccessNotification();
        })
      )
      .subscribe();
  }

  public getLenders(): ILender[] {
    return this._lenders;
  }

  public updateOriginalLenders() {
    this._originalLenders = JSON.parse(JSON.stringify(this._lenders));
  }

  public resetToOriginalLenders() {
    this._lenders = JSON.parse(JSON.stringify(this._originalLenders));
  }

  public getBanks(): IBank[] {
    if (this._lenders.length > 0 && this._banks.length === 0) {
      this._lenders.map((lender: ILender) => {
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
      this._lenders.map((lender: ILender) => {
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
