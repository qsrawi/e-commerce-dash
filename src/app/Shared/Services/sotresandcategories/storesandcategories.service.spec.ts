import { TestBed } from '@angular/core/testing';

import { StoresandcategoriesService } from './storesandcategories.service';

describe('StoresandcategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoresandcategoriesService = TestBed.get(StoresandcategoriesService);
    expect(service).toBeTruthy();
  });
});
