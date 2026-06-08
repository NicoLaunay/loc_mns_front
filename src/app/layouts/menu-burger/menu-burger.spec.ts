import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBurger } from './menu-burger';

describe('MenuBurger', () => {
  let component: MenuBurger;
  let fixture: ComponentFixture<MenuBurger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuBurger],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuBurger);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
