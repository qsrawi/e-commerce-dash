import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsImageComponent } from './items-image.component';

describe('ItemsImageComponent', () => {
  let component: ItemsImageComponent;
  let fixture: ComponentFixture<ItemsImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
