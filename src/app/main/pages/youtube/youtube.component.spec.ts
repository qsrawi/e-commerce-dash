import { ComponentFixture, TestBed } from '@angular/core/testing';

import { youtubeComponent } from './youtube.component';

describe('youtubeComponent', () => {
  let component: youtubeComponent;
  let fixture: ComponentFixture<youtubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ youtubeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(youtubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
