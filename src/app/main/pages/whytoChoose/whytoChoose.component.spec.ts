import { ComponentFixture, TestBed } from '@angular/core/testing';

import { whytoChooseComponent } from './whytoChoose.component';

describe('whytoChooseComponent', () => {
  let component: whytoChooseComponent;
  let fixture: ComponentFixture<whytoChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ whytoChooseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(whytoChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
