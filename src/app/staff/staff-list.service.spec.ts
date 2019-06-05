import { TestBed } from '@angular/core/testing';

import { StaffListService } from './staff-list.service';

describe('StaffListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaffListService = TestBed.get(StaffListService);
    expect(service).toBeTruthy();
  });
});
