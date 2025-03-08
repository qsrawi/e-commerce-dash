import { ComponentFixture, TestBed } from '@angular/core/testing';

import { cu_articlesComponent } from './cu-articles.component';

describe('cu-articlesComponent', () => {
  let component: cu_articlesComponent;
  let fixture: ComponentFixture<cu_articlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ cu_articlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(cu_articlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
