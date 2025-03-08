import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityAndAppearanceComponent } from './quantity-and-appearance.component';

describe('QuantityAndAppearanceComponent', () => {
  let component: QuantityAndAppearanceComponent;
  let fixture: ComponentFixture<QuantityAndAppearanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityAndAppearanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityAndAppearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
