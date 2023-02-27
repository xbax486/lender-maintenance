import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandleService } from './error-handle.service';

describe('HandleerrorService', () => {
  let errorHandleService: ErrorHandleService;
  let toastServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    toastServiceSpy = jasmine.createSpyObj('ToastrService', ['error']);
    errorHandleService = new ErrorHandleService(toastServiceSpy);
  });

  it('should be created', () => {
    expect(errorHandleService).toBeTruthy();
  });
});
