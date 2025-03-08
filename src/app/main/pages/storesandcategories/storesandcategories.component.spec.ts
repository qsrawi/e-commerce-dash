import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresandcategoriesComponent } from './storesandcategories.component';

describe('StoresandcategoriesComponent', () => {
  let component: StoresandcategoriesComponent;
  let fixture: ComponentFixture<StoresandcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoresandcategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoresandcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
