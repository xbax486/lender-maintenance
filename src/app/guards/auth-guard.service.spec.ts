import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LenderService } from '../services/lender.service';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let authGuardService: AuthGuardService;
  let lenderServiceSpy: jasmine.SpyObj<LenderService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    lenderServiceSpy = jasmine.createSpyObj('LenderService', [
      'banksAndTypesLoaded',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authGuardService = new AuthGuardService(lenderServiceSpy, routerSpy);
  });

  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });
});
