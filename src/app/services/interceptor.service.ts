import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor(private error: ErrorHandleService) {}

  // intercept function
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // returning an observable to complete the request cycle
    return new Observable((observer) => {
      next.handle(req).subscribe({
        next: (res: HttpEvent<any>) => {
          if (res instanceof HttpResponse) {
            observer.next(res);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.error.handleError(err);
        },
      });
    });
  }
}
