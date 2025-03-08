import { ComponentFixture, TestBed } from '@angular/core/testing';

import { articlesComponent } from './articles.component';

describe('articlesComponent', () => {
  let component: articlesComponent;
  let fixture: ComponentFixture<articlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ articlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(articlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
