import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from './confirm-modal.component';

class MockRouter {
  navigate(url: string[]) {
    return;
  }
}

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmModalComponent],
      providers: [{ provide: Router, useClass: MockRouter }],
    }).compileComponents();
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home URL "/" when "onYesClicked" function is called', inject(
    [Router],
    (mockRouter: Router) => {
      const spy = spyOn(mockRouter, 'navigate');
      component.onYesClicked();
      expect(spy.calls.first().args[0]).toEqual(['']);
    }
  ));
});
