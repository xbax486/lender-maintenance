import { TestBed } from '@angular/core/testing';
import { ErrorHandleService } from './error-handle.service';
import { InterceptorService } from './interceptor.service';

describe('InterceptorService', () => {
  let interceptorService: InterceptorService;
  let errorHandleServiceSpy: jasmine.SpyObj<ErrorHandleService>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    errorHandleServiceSpy = jasmine.createSpyObj('ToastrService', [
      'handleError',
    ]);
    interceptorService = new InterceptorService(errorHandleServiceSpy);
  });

  it('should be created', () => {
    expect(interceptorService).toBeTruthy();
  });
});
