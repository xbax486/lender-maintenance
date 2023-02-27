import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import * as _ from 'lodash';

import { LenderService } from '../../services/lender.service';
import { ErrorHandleService } from '../../services/error-handle.service';

import { LenderMaintenanceComponent } from './lender-maintenance.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { EllipsisPipe } from '../../pipes/ellipsis.pipe';
import { ILender } from 'src/app/models/lender';
import { IBank } from 'src/app/models/bank';

class MockRouter {
  navigate(url: string[]) {
    return;
  }
}

describe('LenderMaintenanceComponent', () => {
  let component: LenderMaintenanceComponent;
  let fixture: ComponentFixture<LenderMaintenanceComponent>;
  let fakelenderService: Partial<LenderService>;
  let fakeErrorHandleService: Partial<ErrorHandleService>;
  let selectedLender: ILender;
  let anotherLender: ILender;
  let banks: IBank[];

  beforeEach(async () => {
    selectedLender = {
      type: 'lenders',
      id: '1',
      attributes: {
        code: 'CUA',
        name: 'Credit Union Australia',
        type: 'residential',
        upfont_commission: 66,
        high_trail_commission: 17,
        low_trail_commission: 17,
        balance_multiplier: 100,
        is_active: false,
        is_hidden: true,
      },
    };

    anotherLender = {
      type: 'lenders',
      id: '2',
      attributes: {
        code: 'DEP',
        name: 'Deposit Assure',
        type: 'insurance',
        upfont_commission: 6,
        high_trail_commission: 1,
        low_trail_commission: 7,
        balance_multiplier: 10,
        is_active: true,
        is_hidden: false,
      },
    };

    banks = [
      { code: 'CUA', name: 'Credit Union Australia' },
      { code: 'DEP', name: 'Deposit Assure' },
    ];

    fakelenderService = {
      lenders$: new BehaviorSubject<ILender[]>([]),
      selectedLender$: new BehaviorSubject<ILender>({
        type: '',
        id: '',
        attributes: {
          code: '',
          name: '',
          type: '',
          upfont_commission: 0,
          high_trail_commission: 0,
          low_trail_commission: 0,
          balance_multiplier: 0,
          is_active: false,
          is_hidden: false,
        },
      }),
      loadLenders: () => {},
      retryToloadLenders: () => {},
      getLenders: () => [selectedLender, anotherLender],
      updateLenders: () => {},
      getBanks: () => _.cloneDeep(banks),
      getTypes: () => [],
    };

    fakeErrorHandleService = {
      errorOccurSubject$: new Subject(),
    };

    await TestBed.configureTestingModule({
      declarations: [
        LenderMaintenanceComponent,
        LoadingSpinnerComponent,
        EllipsisPipe,
      ],
      providers: [
        { provide: LenderService, useValue: fakelenderService },
        { provide: ErrorHandleService, useValue: fakeErrorHandleService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LenderMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the latest lenders loaded and loaded flags updated when function hanleLendersLoaded() is called', () => {
    expect(component.lenders).toContain(selectedLender);
    expect(component.lenders).toContain(anotherLender);
    expect(component.lenderStartLoaded).toBeFalse();
    expect(component.lenderLoadedSucceed).toBeTrue();
  });

  it('should navigate to route "/lender/:index" and update selected lender when function onEditClicked() is clicked', inject(
    [Router],
    (mockRouter: Router) => {
      const spy = spyOn(mockRouter, 'navigate');
      component.onEditClicked(anotherLender);

      expect(spy.calls.first().args[0]).toEqual([
        '/lender',
        component.lenders.indexOf(anotherLender),
      ]);
      fakelenderService.selectedLender$?.subscribe((lender: ILender) => {
        expect(lender).toEqual(anotherLender);
      });
    }
  ));
});
