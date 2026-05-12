import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEquipmentCard } from './admin-equipment-card';

describe('AdminEquipmentCard', () => {
  let component: AdminEquipmentCard;
  let fixture: ComponentFixture<AdminEquipmentCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEquipmentCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEquipmentCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
