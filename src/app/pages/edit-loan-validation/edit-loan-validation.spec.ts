import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoanValidation } from './edit-loan-validation';

describe('EditLoanValidation', () => {
  let component: EditLoanValidation;
  let fixture: ComponentFixture<EditLoanValidation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLoanValidation],
    }).compileComponents();

    fixture = TestBed.createComponent(EditLoanValidation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
