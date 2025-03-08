import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreestimatedDateComponent } from './storeestimated-date.component';

describe('StoreestimatedDateComponent', () => {
  let component: StoreestimatedDateComponent;
  let fixture: ComponentFixture<StoreestimatedDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreestimatedDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreestimatedDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
