import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderMaintenanceComponent } from './lender-maintenance.component';

describe('LenderMaintenanceComponent', () => {
  let component: LenderMaintenanceComponent;
  let fixture: ComponentFixture<LenderMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LenderMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LenderMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
