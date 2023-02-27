import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LenderService } from './lender.service';

describe('LenderService', () => {
  let service: LenderService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let toastServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    toastServiceSpy = jasmine.createSpyObj('ToastrService', ['success']);
    service = new LenderService(httpClientSpy, toastServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
