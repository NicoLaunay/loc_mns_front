import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoanForm } from './edit-loan-form';

describe('NewLoanForm', () => {
  let component: EditLoanForm;
  let fixture: ComponentFixture<EditLoanForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLoanForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EditLoanForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
