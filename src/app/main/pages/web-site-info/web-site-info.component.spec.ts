import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSiteInfoComponent } from './web-site-info.component';

describe('WebSiteInfoComponent', () => {
  let component: WebSiteInfoComponent;
  let fixture: ComponentFixture<WebSiteInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebSiteInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebSiteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
