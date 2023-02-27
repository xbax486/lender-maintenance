import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandleService {
  public errorOccurSubject$ = new Subject();
  errorMessage: string = '';

  constructor(private toastService: ToastrService) {}

  public handleError(error: HttpErrorResponse) {
    // you could check the status of the error for different handling
    // (e.g. if (error && error.status == 401))
    this.errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      this.errorMessage = `An error occured: ${error.error.message}`;
    } else {
      this.errorMessage =
        'Something wrong while loading lenders. Please click on the "Retry" button to try it again. If it still fails, please check with the administrator.';
    }
    this.errorOccurSubject$.next(new Error('Error Occurs!'));
    this.toastService.error(this.errorMessage, 'Error');
  }
}
