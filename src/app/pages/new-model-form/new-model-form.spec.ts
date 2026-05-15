import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewModelForm } from './new-model-form';

describe('NewModelForm', () => {
  let component: NewModelForm;
  let fixture: ComponentFixture<NewModelForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewModelForm],
    }).compileComponents();

    fixture = TestBed.createComponent(NewModelForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
