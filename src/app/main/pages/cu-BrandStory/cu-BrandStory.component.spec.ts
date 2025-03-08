import { ComponentFixture, TestBed } from '@angular/core/testing';

import { cu_BrandStoryComponent } from './cu-BrandStory.component';

describe('cu-BrandStoryComponent', () => {
  let component: cu_BrandStoryComponent;
  let fixture: ComponentFixture<cu_BrandStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ cu_BrandStoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(cu_BrandStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
