import { TestBed } from '@angular/core/testing';

import { FeesTransactionService } from './fees-transaction.service';

describe('FeesTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeesTransactionService = TestBed.get(FeesTransactionService);
    expect(service).toBeTruthy();
  });
});
