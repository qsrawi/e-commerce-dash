import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleimagesComponent } from './middleimages.component';

describe('MiddleimagesComponent', () => {
  let component: MiddleimagesComponent;
  let fixture: ComponentFixture<MiddleimagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiddleimagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiddleimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
