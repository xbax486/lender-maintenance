import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandleService {
  public errorOccurSubject = new Subject();

  constructor(private toastService: ToastrService) {}

  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${error.error.message}`;
    } else {
      errorMessage =
        'Something on the backend side goes wrong. Please check with the administrator.';
    }
    this.errorOccurSubject.next(new Error('Ses'));
    this.toastService.error(errorMessage, 'Error');
  }
}
