import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModelCard } from './admin-model-card';

describe('AdminModelCard', () => {
  let component: AdminModelCard;
  let fixture: ComponentFixture<AdminModelCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminModelCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminModelCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
