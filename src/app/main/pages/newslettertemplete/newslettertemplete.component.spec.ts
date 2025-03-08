import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewslettertempleteComponent } from './newslettertemplete.component';

describe('NewslettertempleteComponent', () => {
  let component: NewslettertempleteComponent;
  let fixture: ComponentFixture<NewslettertempleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewslettertempleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewslettertempleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
