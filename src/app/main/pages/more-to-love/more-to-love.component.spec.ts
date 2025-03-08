import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreToLoveComponent } from './more-to-love.component';

describe('MoreToLoveComponent', () => {
  let component: MoreToLoveComponent;
  let fixture: ComponentFixture<MoreToLoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreToLoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreToLoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
