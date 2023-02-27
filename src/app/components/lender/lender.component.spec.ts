import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

import { LenderService } from '../../services/lender.service';
import { LenderComponent } from './lender.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ILender } from 'src/app/models/lender';
import { IBank } from 'src/app/models/bank';
import { BankProperties } from 'src/app/enums/bank-properties';

class MockRouter {
  navigate(url: string[]) {
    return;
  }
}

describe('LenderComponent', () => {
  let component: LenderComponent;
  let fixture: ComponentFixture<LenderComponent>;
  let fakelenderService: Partial<LenderService>;
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
      getLenders: () => [
        _.cloneDeep(selectedLender),
        _.cloneDeep(anotherLender),
      ],
      updateLenders: () => {},
      getBanks: () => _.cloneDeep(banks),
      getTypes: () => [],
    };

    await TestBed.configureTestingModule({
      declarations: [LenderComponent, ConfirmModalComponent],
      imports: [FormsModule],
      providers: [
        { provide: LenderService, useValue: fakelenderService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update the selected lender if a new one is broadcasted via "selectedLender$" behaviour subject', () => {
    fakelenderService.selectedLender$?.next(selectedLender);

    component.getSelectedLender();

    expect(component.selectedLender.id).toBe(selectedLender.id);
    expect(component.originalLender.id).toBe(selectedLender.id);
  });

  it('should update the bank name accordingly if bank code is changed', () => {
    component.selectedLender = selectedLender;
    component.banks = banks;
    component.selectedLender.attributes.code = 'DEP';
    const bankProperty: BankProperties = 0;

    component.onBankChanged(bankProperty);

    expect(component.selectedLender.attributes.name).toBe(
      component.banks[1].name
    );
  });

  it('should update the bank code accordingly if bank name is changed', () => {
    component.selectedLender = selectedLender;
    component.banks = banks;
    component.selectedLender.attributes.name = 'Deposit Assure';
    const bankProperty: BankProperties = 1;

    component.onBankChanged(bankProperty);

    expect(component.selectedLender.attributes.code).toBe(
      component.banks[1].code
    );
  });

  it('should show confirm modal if "Cancel" button is clicked when there is any change on selected lender', () => {
    component.originalLender = {
      type: 'lenders',
      id: '1',
      attributes: {
        code: 'DEP',
        name: 'Deposit Assure',
        type: 'insurance',
        upfont_commission: 66,
        high_trail_commission: 17,
        low_trail_commission: 17,
        balance_multiplier: 100,
        is_active: false,
        is_hidden: true,
      },
    };
    component.selectedLender = selectedLender;

    component.onCancelClicked();

    const element = fixture.debugElement.nativeElement;

    expect(element.querySelector('div.app-confirm-modal')).toBeTruthy();
  });

  it('should navigate to home URL "/" if "Cancel" button is clicked when there is no change on selected lender', inject(
    [Router],
    (mockRouter: Router) => {
      const spy = spyOn(mockRouter, 'navigate');
      component.selectedLender = selectedLender;
      component.originalLender = _.cloneDeep(selectedLender);

      component.onCancelClicked();

      expect(spy.calls.first().args[0]).toEqual(['']);
    }
  ));
});
