import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLoanForm } from './new-loan-form';

describe('NewLoanForm', () => {
  let component: NewLoanForm;
  let fixture: ComponentFixture<NewLoanForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewLoanForm],
    }).compileComponents();

    fixture = TestBed.createComponent(NewLoanForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
