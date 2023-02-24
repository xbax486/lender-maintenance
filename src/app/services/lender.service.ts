import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';

import { LenderJsonResult } from '../models/lender';

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
}
