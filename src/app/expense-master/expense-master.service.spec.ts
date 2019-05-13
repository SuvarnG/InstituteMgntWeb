import { TestBed } from '@angular/core/testing';

import { ExpenseMasterService } from './expense-master.service';

describe('ExpenseMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpenseMasterService = TestBed.get(ExpenseMasterService);
    expect(service).toBeTruthy();
  });
});
