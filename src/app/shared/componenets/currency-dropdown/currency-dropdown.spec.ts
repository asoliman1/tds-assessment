import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyDropdown } from './currency-dropdown';

describe('CurrencyDropdown', () => {
  let component: CurrencyDropdown;
  let fixture: ComponentFixture<CurrencyDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
