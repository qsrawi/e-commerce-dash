import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsDiscountComponent } from './items-discount.component';

describe('ItemsDiscountComponent', () => {
  let component: ItemsDiscountComponent;
  let fixture: ComponentFixture<ItemsDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsDiscountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
