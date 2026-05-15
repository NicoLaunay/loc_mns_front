import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTypeForm } from './new-type-form';

describe('NewTypeForm', () => {
  let component: NewTypeForm;
  let fixture: ComponentFixture<NewTypeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTypeForm],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTypeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
