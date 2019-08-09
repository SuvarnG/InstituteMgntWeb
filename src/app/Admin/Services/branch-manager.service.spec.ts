import { TestBed } from '@angular/core/testing';

import { BranchManagerService } from '../Services/branch-manager.service';

describe('BranchManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BranchManagerService = TestBed.get(BranchManagerService);
    expect(service).toBeTruthy();
  });
});
