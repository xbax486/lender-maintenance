import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { ErrorHandleService } from './error-handle.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private errorHandleService: ErrorHandleService) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return new Observable((observer) => {
      next.handle(request).subscribe({
        next: (response: HttpEvent<any>) => {
          if (response instanceof HttpResponse) {
            observer.next(response);
          }
        },
        error: (httpErrorResponse: HttpErrorResponse) => {
          this.errorHandleService.handleError(httpErrorResponse);
        },
      });
    });
  }
}
