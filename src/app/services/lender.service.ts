import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';

import { LenderJsonResult } from '../models/lender';

@Injectable({
  providedIn: 'root'
})
export class LenderService {
  private _jsonURL = 'assets/lenders.json';
  private delayTime = 2000;

  constructor(private http: HttpClient) {
    
  }

  public getLenders(): Observable<LenderJsonResult> {
    return this.http.get<LenderJsonResult>(this._jsonURL).pipe(delay(this.delayTime));
  }
}
