import { TestBed } from '@angular/core/testing';

import { LeavelistService } from '../../staff/services/leavelist.service';

describe('LeavelistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeavelistService = TestBed.get(LeavelistService);
    expect(service).toBeTruthy();
  });
});
