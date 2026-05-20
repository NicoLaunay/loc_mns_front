import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoanCard } from './admin-loan-card';

describe('AdminLoanCard', () => {
  let component: AdminLoanCard;
  let fixture: ComponentFixture<AdminLoanCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLoanCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminLoanCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
