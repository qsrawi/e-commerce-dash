import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingFastComponent } from './selling-fast.component';

describe('SellingFastComponent', () => {
  let component: SellingFastComponent;
  let fixture: ComponentFixture<SellingFastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellingFastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellingFastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
