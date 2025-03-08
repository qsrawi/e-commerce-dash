import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesImageComponent } from './categories-image.component';

describe('CategoriesImageComponent', () => {
  let component: CategoriesImageComponent;
  let fixture: ComponentFixture<CategoriesImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
